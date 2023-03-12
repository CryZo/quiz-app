import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IBundle } from '@/interfaces';

export const useQuestionsStore = defineStore('questions', () => {
  const bundles = ref<IBundle[]>([]);

  const addBundle = (data: IBundle) => {
    bundles.value.push(data);
    validateModel();
  };

  const validateModel = () => {
    bundles.value.forEach(bundle => {
      const invalidIndexes: number[] = [];
  
      for (let i = 0; i < bundle.questions.length; i++) {
        const question = bundle.questions[i];
        
        if (!question.question || !question.answers[0].label || !question.answers[1].label || !question.answers[2].label || !question.answers[3].label)
          invalidIndexes.push(i);
      }
  
      invalidIndexes.reverse().forEach(i => bundle.questions.splice(i, 1));
    });
  };

  return {bundles, addBundle};
});
