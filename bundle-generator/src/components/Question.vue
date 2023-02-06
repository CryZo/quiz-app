<template>
  <div class="flex flex-col">
    <input
      class="w-full mb-2 | px-2 bg-slate-900 border border-slate-700 rounded-md focus-visible:outline-none focus-visible:border-purple-600"
      type="text"
      v-model="question.question"
      placeholder="Question"
      >
    <div class="flex gap-2 w-full">
      <div class="w-full flex relative" v-for="i in 4">
        <input
          :class="`w-full px-2 bg-slate-900 border ${question.answers[i-1].isCorrect ? 'border-green-600' : 'border-red-600'} rounded-md focus-visible:outline-none focus-visible:border-purple-600`"
          type="text"
          v-model="question.answers[i-1].label"
          :placeholder="`Answer ${i}`"
          >
        <input class="absolute right-1 top-0 h-full opacity-50" type="checkbox" v-model="question.answers[i-1].isCorrect">
      </div>
      <button class="cursor-pointer" @click="store.questions.splice(index, 1)">&times;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type IQuestion from '@/interfaces/IQuestion';
import { useQuestionsStore } from '@/stores/questions';

const store = useQuestionsStore();

const props = defineProps<{
  question: IQuestion,
  index: number
}>();
</script>
