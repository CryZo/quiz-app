<template>
  <main class="mx-2">
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
