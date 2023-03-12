<template>
  <main class="mx-2">
    <div class="mb-8">
      <input
        :class="`w-full px-2 bg-slate-900 border rounded-md focus-visible:outline-none focus-visible:border-purple-600`"
        type="text"
        v-model="store.title"
        placeholder="Title"
        >
    </div>

    <Question class="mb-6" v-for="question,i in store.questions" :question="question" :index="i" :key="`question_${i}`"></Question>
    <div @click="store.addNew" class="flex h-20 border-8 border-dashed border-slate-700 cursor-pointer">
      <div class="m-auto">
        <span>+</span>
        <span>New</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Question from '../components/Question.vue';
import { useQuestionsStore } from '@/stores/questions';

const store = useQuestionsStore();
</script>
