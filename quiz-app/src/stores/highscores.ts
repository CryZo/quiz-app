import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useHighscoresStore = defineStore('highscores', () => {
  const maxCount = 10;

  const highscores = ref<{name: string, score: number}[]>([]);

  const addScore = (name: string, score: number) => {
    highscores.value.push({name, score});

    sort();
    trim();
    validate();
    save();
  }

  const sort = () => {
    highscores.value = highscores.value.sort((a, b) => {
      if (!a || !b)
        return 0;

      return b.score - a.score
    })
  }

  const trim = () => {
    if (highscores.value.length > maxCount)
      highscores.value.length = maxCount;
  }

  const validate = () => {
    const invalidIndexes: number[] = [];

    for (let i = 0; i < highscores.value.length; i++) {
      const highscore = highscores.value[i];
      
      if (!highscore || !highscore.name || highscore.score === undefined)
        invalidIndexes.push(i);
    }

    invalidIndexes.reverse().forEach(i => highscores.value.splice(i, 1));
  }

  const save = () => {
    localStorage.setItem('highscores', JSON.stringify(highscores.value));
  }

  const load = () => {
    highscores.value = JSON.parse(localStorage.getItem('highscores') ?? '[]');
    sort();
    trim();
    validate();
  }

  load();

  return {highscores, addScore};
});
