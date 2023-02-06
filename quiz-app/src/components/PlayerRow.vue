<template>
  <div :class="`w-full flex ${store.players.length === 1 ? 'justify-center' : 'justify-between'}`">
    <div
      v-for="player in store.players"
      :class="`m-4 flex flex-col items-center ${player.isActive ? 'bg-yellow-600' : ''}`"
      >
      <span class="text-xl">{{ player.name }}</span>
      <span :class="`${player.score > 0 ? 'text-green-500' : ''} ${player.score < 0 ? 'text-red-500' : ''}`">{{ player.score }} Gummipunkte</span>
    </div>
  </div>

</template>

<script setup lang="ts">
import { usePlayersStore } from '@/stores/players';

const store = usePlayersStore();
</script>
