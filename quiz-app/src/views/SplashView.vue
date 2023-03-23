<template>
  <div
    @dragover="dragOverHandler"
    @drop="dropHandler"
    class="w-full h-full flex flex-col justify-evenly items-center"
    >
    <h1 class="text-9xl font-bold text-center text-shadow-xl">Chasers Quiz</h1>
    <p class="text-lg">Zum beginnen Bundles ins Fenster ziehen</p>

    <template v-if="store.bundles.length">
      <ul>
        <li v-for="bundle in store.bundles">{{ bundle.title }}</li>
      </ul>

      <RouterLink :to="{name: 'playerSetup'}" class="mx-auto px-6 py-4 border-2 border-blue-500 bg-blue-800 text-blue-200 rounded-2xl shadow-xl">Weiter</RouterLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuestionsStore } from '@/stores/questions';
import { RouterLink } from 'vue-router'
// import { useRouter } from 'vue-router';
// const router = useRouter();

const store = useQuestionsStore();

const dragOverHandler = (e: DragEvent) => {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer!.dropEffect = 'copy';
};

const dropHandler = (e: DragEvent) => {
  e.stopPropagation();
  e.preventDefault();

  const fileList = e.dataTransfer!.files;
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    
    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        store.addBundle(JSON.parse(event.target!.result as string));
        // router.push({
        //   name: 'playerSetup'
        // })
      });
      reader.readAsText(file);
    }
  }
};
</script>
