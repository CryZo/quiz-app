<template>
  <div :class="`w-full flex ${store.players.length === 1 ? 'justify-center' : 'justify-between'}`">
    <div
      v-for="player, i in store.players"
      class="relative m-4 flex flex-row"
      >
      <Keycap class="h-full w-[52px] mr-4" :label="getPlayerKey(i)"></Keycap>

      <div :class="`absolute -left-[10%] rotate-6 w-[120%] h-full -z-10 ${player.isActive ? 'bg-blue-500' : ''}`">

      </div>

      <div class="flex flex-col items-center whitespace-nowrap">
        <span class="text-xl">{{ player.name }}</span>
        <span :class="`${player.score > 0 ? 'text-green-500' : ''} ${player.score < 0 ? 'text-red-500' : ''}`">{{ player.score }} Gummipunkte</span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { usePlayersStore } from '@/stores/players';
import Keycap from '@/components/Keycap.vue';

const store = usePlayersStore();

const getPlayerKey = (number: number): string => {
  if (store.players.length === 1) {
    return 'B';
  }

  if (store.players.length === 2) {
    switch (number) {
      case 0: return 'Q';
      case 1: return 'P';
    }
  }

  if (store.players.length === 3) {
    switch (number) {
      case 0: return 'Q';
      case 1: return 'B';
      case 2: return 'P';
    }
  }

  return '';
};
</script>
