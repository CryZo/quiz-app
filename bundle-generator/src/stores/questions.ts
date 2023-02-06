import { ref } from 'vue';
import { defineStore } from 'pinia';
import type IQuestion from '@/interfaces/IQuestion';

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<IQuestion[]>([]);

  const addNew = () => {
    questions.value.push({question: '', answers: [{label: '', isCorrect: false}, {label: '', isCorrect: false}, {label: '', isCorrect: false}, {label: '', isCorrect: false}]});
  };
  
  const downloadFile = () => {
    const link = document.createElement("a");
    const content = JSON.stringify(questions.value);
    const file = new Blob([content], {type: 'application/json'});
    link.href = URL.createObjectURL(file);
    link.download = `quiz_bundle_1${new Date().toISOString().substring(0,19).replace('T', '_').replace(/:/g, '-')}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const setModel = (data: IQuestion[]) => {
    questions.value = data;
    addNew();
  };

  const clear = () => {
    questions.value.length = 0;
    addNew();
  };

  clear();
  return {questions, addNew, downloadFile, setModel, clear};
});
