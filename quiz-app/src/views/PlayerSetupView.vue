<template>
  <div v-if="store.setupStep === 0" class="w-full h-full flex flex-col justify-evenly items-center bg-yellow-700">
    <h1 class="text-3xl font-bold text-center">Wie viele Spieler werden teilnehmen?</h1>
    
    <div class="w-full flex flex-row justify-evenly">
      <button @click="store.setPlayerCount(1)" class="playerButton bg-green-500">1</button>
      <button @click="store.setPlayerCount(2)" class="playerButton bg-indigo-500">2</button>
      <button @click="store.setPlayerCount(3)" class="playerButton bg-orange-500">3</button>
    </div>
  </div>

  <div v-else-if="store.setupStep === 1" class="w-full h-full flex flex-col justify-evenly items-center bg-blue-900">
    <h1 class="text-3xl font-bold text-center">Namen eingeben</h1>
    
    <div class="w-full flex flex-row justify-evenly">
      <div v-for="player,i in store.players" class="flex flex-col">
        <label :for="`player_${i}`">Spieler {{ i+1 }}:</label>
        <input type="text" v-model="store.players[i].name" :id="`player_${i}`" class="bg-stone-200 border-2 border-black rounded-md focus-visible:outline-none focus-visible:border-purple-600">
      </div>
    </div>

    <button @click="startGame" class="mx-auto px-6 py-4 border-2 border-blue-500 bg-blue-800 text-blue-200 rounded-2xl shadow-xl">Auf geht's!</button>
  </div>
</template>

<script setup lang="ts">
import { usePlayersStore } from '@/stores/players';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const store = usePlayersStore();

const startGame = () => {
  store.setupStep = 2;
  router.push({
    name: 'game'
  });
}

onMounted(() => {
  store.setupStep = 0;
});
</script>

<style lang="scss" scoped>
.playerButton {
  @apply w-48 h-48 rounded-lg border-2 border-black font-bold text-5xl shadow-xl hover:animate-bounce;

  &:hover {
    animation: tada 600ms;
    
    @keyframes tada {
      from {
        transform: scale3d(1, 1, 1);
      }

      10%,
      20% {
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
      }

      30%,
      50%,
      70%,
      90% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
      }

      40%,
      60%,
      80% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
      }

      to {
        transform: scale3d(1, 1, 1);
      }
    }
  }
}
</style>