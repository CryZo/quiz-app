<template>
  <div class="w-full h-full flex flex-col justify-start items-center bg-[#05092b] text-white font-BladeRunner lowercase">
    <h1 class="my-8 text-3xl font-bold text-center">Hall of fame</h1>

    <table>
      <tr>
        <th class="w-96"></th>
        <th class="w-64"></th>
      </tr>
      <tr v-for="highscore,i in store.highscores">
        <td>
          <RetroTitle class="animate__animated animate__bounceInLeft" :style="`animation-delay: ${i * 50}ms;`" :title="highscore.name"></RetroTitle>  
        </td>
        <td>
          <RetroTitle class="animate__animated animate__bounceInRight" :style="`animation-delay: ${i * 50}ms;`" :title="highscore.score.toLocaleString() + ' GP'"></RetroTitle>  
        </td>
      </tr>
    </table> 

    <button @click="newGame" class="mt-auto mb-8 | px-8 py-4 rounded-xl border-2 border-fuchsia-600 text-fuchsia-400 bg-fuchsia-900 hover:bg-fuchsia-800 lowercase">Nächste Runde</button>
  </div>
</template>

<script setup lang="ts">
import { useHighscoresStore } from '@/stores/highscores';
import { useRouter } from 'vue-router';

import RetroTitle from '@/components/RetroTitle.vue';

const store = useHighscoresStore();
const router = useRouter();

const newGame = () => {
  router.push({
    name: 'playerSetup'
  })
}
</script>
