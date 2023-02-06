import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IPlayer } from '@/interfaces';

export const usePlayersStore = defineStore('players', () => {
  const setupStep = ref(0);
  const players = ref<IPlayer[]>([]);


  const setPlayerCount = (value: number) => {
    players.value.length = 0;
    for (let i = 0; i < value; i++)
      players.value.push({
        name: '',
        score: 0,
        isActive: false
      });
    setupStep.value = 1;
  }

  return {setupStep, players, setPlayerCount};
});
