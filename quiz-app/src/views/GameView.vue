<template>
  <div v-if="categorySelectorVisible" class="w-full h-full p-8 flex flex-col items-center">
    <span class="text-7xl">{{ lastWinner.name }}, wähle eine Kategorie:</span>

    <div class="my-auto w-96 flex flex-col gap-8">
      <span
        v-for="i, c in categoryIndexes"
        class="answer | inline-flex items-center justify-center text-black font-bold bg-orange-300 before:!border-t-orange-300 before:!border-r-orange-300 after:!border-t-orange-300 after:!border-r-orange-300"
        >
        <Keycap class="absolute left-0 -top-1/2 h-12" :label="(c+1).toString()"></Keycap>
        <span class="mx-auto">{{ questionsStore.bundles[i].title }}</span>
      </span>
    </div>
  </div>
  <div v-else :class="`w-full h-full flex flex-col relative`">
    <!-- <div class="bottom-shadow"></div> -->
    <!-- <span class="absolute top-2 right-2 text-red-400 font-bold">{{ questionsStore.bundles[bundleIndex].title }}</span> -->
    <div class="absolute top-2 right-0 w-96 rotate-12">
      <Heading class="">{{ questionsStore.bundles[bundleIndex].title }}</Heading>
    </div>

    <div v-if="curQuestion" class="h-full w-full flex flex-col justify-evenly items-center">
      <span class="text-7xl text-center">{{ curQuestion.question }}</span>

      <div class="grid grid-cols-2 gap-x-16 gap-y-4 text-white">
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
import Keycap from '@/components/Keycap.vue';
import Heading from '@/components/Heading.vue';

const router = useRouter();
const playersStore = usePlayersStore();
const questionsStore = useQuestionsStore();
const highscoresStore = useHighscoresStore();

const totalQuestions = 10;
const correctPoints = 100;
const falsePoints = 100;
const categoryCount = 3;

const lastWinner = ref<IPlayer>(playersStore.players[Math.floor(Math.random() * playersStore.players.length)]);
const bundleIndex = ref<number>(-1)
const curQuestion = ref<IQuestion>();
const questionHistory = ref<string[]>([]);
const showAnswers = ref(false);
const isCorrect = ref(true);
const categorySelectorVisible = ref(true);
const categoryIndexes = ref<number[]>([]);

const getRandomCategories = () => {
  const ret: number[] = [];
  if (questionsStore.bundles.length > 3) {
    while (ret.length < categoryCount) {
      const tmpIndex = Math.floor(Math.random() * questionsStore.bundles.length);
      if (!ret.includes(tmpIndex))
        ret.push(tmpIndex);
    }
  }
  else {
    for (let i = 0; i < questionsStore.bundles.length; i++) {
      ret.push(i);
    }
  }

  return ret;
}

const showCategorySelector = () => {
  categoryIndexes.value = getRandomCategories();
  if (categoryIndexes.value.length === 1) {
    return setNextCategory(categoryIndexes.value[0]);
  }

  categorySelectorVisible.value = true;
};

const setNextCategory = (index: number) => {
  bundleIndex.value = index;
  categorySelectorVisible.value = false;
  setNextQuestion();
};

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

  let questionIndex;
  while (true) {
    questionIndex = Math.floor(Math.random() * questionsStore.bundles[bundleIndex.value].questions.length);
    if (!questionHistory.value.includes(`${bundleIndex.value}_${questionIndex}`))
      break;
  }

  curQuestion.value = questionsStore.bundles[bundleIndex.value].questions[questionIndex];
  questionHistory.value.push(`${bundleIndex.value}_${questionIndex}`);
}

const handleInput = (ev: any) => {
  const e: KeyboardEvent = ev.event;

  if (categorySelectorVisible.value) {
    for (let i = 1; i <= 9 && i <= categoryCount; i++) {
      if (e.key === i.toString())
        return setNextCategory(categoryIndexes.value[i-1]);
    }

    return;
  }

  if (showAnswers.value === true)
    return;

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
      lastWinner.value = player
    }
    else {
      player.score -= falsePoints;
      lastWinner.value = playersStore.players[Math.floor(Math.random() * playersStore.players.length)];
    }
    player.isActive = false;

    showAnswers.value = true;

    setTimeout(() => {
      showAnswers.value = false;
      showCategorySelector();
      // setNextQuestion();
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
    for (let i = 1; i <= 4; i++) {
      if (e.key === i.toString())
        return checkAnswer(getActivePlayer()!, i)
    }
  }
};

onMounted(() => {
  // setNextQuestion();
  // categoryIndexes.value = getRandomCategories();
  showCategorySelector();
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

  $height: 4rem;

  height: calc($height + 12px);
  font-size: $height /2;

  &::before, &::after {
    $sideLength: math.div($height * math.sin(45), 2);

    content: '';
    position: absolute;
    top: 10px;

    border-left: solid $sideLength transparent;
    border-top: solid $sideLength black;
    border-right: solid $sideLength black;
    border-bottom: solid $sideLength transparent;

    display: inline-block;

    height: 0;
    width: 0;
  }

  &::before {
    left: calc(math.div($height, 2) * -1 + 6px);
    transform: rotate(-135deg);
  }

  &::after {
    right: calc(math.div($height, 2) * -1 + 6px);
    transform: rotate(45deg);
  }
}
</style>
