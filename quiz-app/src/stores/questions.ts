import { ref } from 'vue';
import { defineStore } from 'pinia';
import type IQuestion from '@/interfaces/IQuestion';

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<IQuestion[]>([]);

  const setModel = (data: IQuestion[]) => {
    questions.value = data;
    validateModel();
  };

  const validateModel = () => {
    const invalidIndexes: number[] = [];

    for (let i = 0; i < questions.value.length; i++) {
      const question = questions.value[i];
      
      if (!question.question || !question.answers[0].label || !question.answers[1].label || !question.answers[2].label || !question.answers[3].label)
        invalidIndexes.push(i);
    }

    invalidIndexes.reverse().forEach(i => questions.value.splice(i, 1));
  };

  return {questions, setModel};
});
