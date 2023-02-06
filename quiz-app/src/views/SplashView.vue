<template>
  <div
    @dragover="dragOverHandler"
    @drop="dropHandler"
    class="w-full h-full flex flex-col justify-evenly items-center bg-purple-700"
    >
    <h1 class="text-9xl font-bold text-center">Cooler Titel hier einfügen</h1>
    <p>Zum beginnen Bundle ins Fenster ziehen</p>
  </div>
</template>

<script setup lang="ts">
import { useQuestionsStore } from '@/stores/questions';
import { useRouter } from 'vue-router';
const router = useRouter();

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

  if (fileList[0] && fileList[0].type === 'application/json') {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      store.setModel(JSON.parse(event.target!.result as string));
      router.push({
        name: 'playerSetup'
      })
    });
    reader.readAsText(fileList[0]);
  }
};
</script>
