<template>
  <div :class="`w-full h-full flex flex-col ${showAnswers ? isCorrect ? 'bg-green-800' : 'bg-red-800' : 'bg-zinc-900'} text-white relative`">
    <!-- <div class="bottom-shadow"></div> -->

    <div v-if="curQuestion" class="h-full w-full flex flex-col justify-evenly items-center">
      <span class="text-5xl text-center">{{ curQuestion.question }}</span>

      <div class="grid grid-cols-2 gap-x-12 gap-y-4">
        <span
          v-for="answer,i in curQuestion.answers"
          :class="`answer | inline-flex items-center justify-center ${showAnswers ? answer.isCorrect ? 'bg-green-500 before:!border-t-green-500 before:!border-r-green-500 after:!border-t-green-500 after:!border-r-green-500' : 'bg-red-500 before:!border-t-red-500 before:!border-r-red-500 after:!border-t-red-500 after:!border-r-red-500' : 'bg-zinc-800 before:!border-t-zinc-800 before:!border-r-zinc-800 after:!border-t-zinc-800 after:!border-r-zinc-800'}`"
          >{{ i+1 }}. {{ answer.label }}</span>
      </div>
    </div>

    <PlayerRow class="mt-auto"></PlayerRow>
  </div>
</template>

<script setup lang="ts">
import type { IPlayer, IQuestion } from '@/interfaces';
import { usePlayersStore } from '@/stores/players';
import { useQuestionsStore } from '@/stores/questions';
import { useHighscoresStore } from '@/stores/highscores';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useKeypress } from 'vue3-keypress'

import PlayerRow from '@/components/PlayerRow.vue';

const router = useRouter();
const playersStore = usePlayersStore();
const questionsStore = useQuestionsStore();
const highscoresStore = useHighscoresStore();

const totalQuestions = 10;
const correctPoints = 100;
const falsePoints = 100;

const curQuestion = ref<IQuestion>();
const questionHistory = ref<number[]>([]);
const showAnswers = ref(false);
const isCorrect = ref(true);

const setNextQuestion = () => {
  if (questionHistory.value.length >= totalQuestions) {
    playersStore.players.forEach(player => {
      highscoresStore.addScore(player.name, player.score);
    });

    router.push({
      name: 'results'
    })

    return;
  }

  let index;
  while (true) {
    index = Math.floor(Math.random() * questionsStore.questions.length);
    if (!questionHistory.value.includes(index))
      break;
  }

  curQuestion.value = questionsStore.questions[index];
  questionHistory.value.push(index);
}

const handleInput = (ev: any) => {
  if (showAnswers.value === true)
    return;

  const e: KeyboardEvent = ev.event;

  const isActive = (): boolean => {
    let ret = false;
    playersStore.players.forEach(player => {
      if (player.isActive)
        ret = true;
    });

    return ret;
  }

  const getActivePlayer = (): IPlayer|undefined => {
    for (let i = 0; i < playersStore.players.length; i++) {
      const player = playersStore.players[i];
      
      if (player.isActive)
        return player;
    }
  }

  const checkAnswer = (player: IPlayer, answer: number) => {
    isCorrect.value = curQuestion.value!.answers[answer-1].isCorrect;
    if (curQuestion.value!.answers[answer-1].isCorrect) {
      player.score += correctPoints;
    }
    else {
      player.score -= falsePoints;
    }
    player.isActive = false;

    showAnswers.value = true;
    
    setTimeout(() => {
      showAnswers.value = false;
      setNextQuestion();
    }, 1500);
  }

  if (playersStore.players.length === 1 && !isActive() && e.key === 'b') {
    playersStore.players[0].isActive = true;
    return;
  }

  if (playersStore.players.length === 2 && !isActive()) {
    switch (e.key) {
      case 'q':
        playersStore.players[0].isActive = true;
        return;

      case 'p':
        playersStore.players[1].isActive = true;
        return;
    }
  }

  if (playersStore.players.length === 3 && !isActive()) {
    switch (e.key) {
      case 'q':
        playersStore.players[0].isActive = true;
        return;

      case 'b':
        playersStore.players[1].isActive = true;
        return;

      case 'p':
        playersStore.players[2].isActive = true;
        return;
    }
  }

  if (isActive()) {
    switch (e.key) {
      case '1': return checkAnswer(getActivePlayer()!, 1);
      case '2': return checkAnswer(getActivePlayer()!, 2);
      case '3': return checkAnswer(getActivePlayer()!, 3);
      case '4': return checkAnswer(getActivePlayer()!, 4);
    }
  }
};

onMounted(() => {
  setNextQuestion();
});

useKeypress({
  keyEvent: "keydown",
  onAnyKey: handleInput,
  keyBinds: []
});
</script>

<style lang="scss" scoped>
@use 'sass:math';

// .bottom-shadow {
//   @apply absolute bottom-0 w-full h-0;

//   box-shadow: 0 0 30px #0f0;
// }

.answer {
  position: relative;

  $height: 2rem;

  height: calc($height + 4px);

  &::before, &::after {
    $sideLength: math.div($height * math.sin(45), 2);

    content: '';
    position: absolute;
    top: 5px;

    border-left: solid $sideLength transparent;
    border-top: solid $sideLength black;
    border-right: solid $sideLength black;
    border-bottom: solid $sideLength transparent;

    display: inline-block;

    height: 0;
    width: 0;
  }

  &::before {
    left: calc(math.div($height, 2) * -1 + 4px);
    transform: rotate(-135deg);
  }

  &::after {
    right: calc(math.div($height, 2) * -1 + 4px);
    transform: rotate(45deg);
  }
}
</style>
