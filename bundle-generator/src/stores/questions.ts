import { ref } from 'vue';
import { defineStore } from 'pinia';
import type IQuestion from '@/interfaces/IQuestion';
import type { IBundle } from '@/interfaces';

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<IQuestion[]>([]);
  const title = ref<string>('Kategorie');

  const addNew = () => {
    questions.value.push({question: '', answers: [{label: '', isCorrect: false}, {label: '', isCorrect: false}, {label: '', isCorrect: false}, {label: '', isCorrect: false}]});
  };
  
  const downloadFile = () => {
    const bundle: IBundle = {
      questions: questions.value,
      title: title.value
    };
    const link = document.createElement("a");
    const content = JSON.stringify(bundle);
    const file = new Blob([content], {type: 'application/json'});
    link.href = URL.createObjectURL(file);
    link.download = `${title.value}_1${new Date().toISOString().substring(0,19).replace('T', '_').replace(/:/g, '-')}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const setModel = (data: IBundle) => {
    title.value = data.title;
    questions.value = data.questions;
    addNew();
  };

  const clear = () => {
    questions.value.length = 0;
    addNew();
  };

  const isSaveToQuit = (): boolean => {
    if (questions.value.length === 0 || (questions.value.length === 1 && !questions.value[0].question && !questions.value[0].answers[0].label && !questions.value[0].answers[1].label && !questions.value[0].answers[2].label && !questions.value[0].answers[3].label))
      return true;

    return false
  };

  clear();
  return {questions, title, addNew, downloadFile, setModel, clear, isSaveToQuit};
});
