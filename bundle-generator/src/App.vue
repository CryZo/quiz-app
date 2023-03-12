<template>
  <header class="flex flex-col bg-slate-900 mb-4 py-2 px-4 shadow-2xl">
    <h1 class="text-2xl mb-2">Bundle editor</h1>
    <div class="flex flex-row justify-around h-24 gap-4">
      <div @click="store.clear" class="flex border-8 w-56 p-4 border-slate-700 cursor-pointer">
        <div class="m-auto flex flex-col items-center justify-around">
          <span>📦</span>
          <span>New</span>
        </div>
      </div>

      <div
        @dragover="dragOverHandler"
        @drop="dropHandler"
        class="flex border-8 border-dashed w-full border-slate-700"
        >
        <div class="m-auto px-2 flex flex-col items-center justify-around">
          <span>➕</span>
          <span>Drag bundle file here to load</span>
        </div>
      </div>

      <div @click="store.downloadFile" class="flex border-8 w-56 p-4 border-slate-700 cursor-pointer">
        <div class="m-auto flex flex-col items-center justify-around">
          <span>💾</span>
          <span>Save bundle to file</span>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions';
import type { IBundle, IQuestion } from './interfaces';
import { onMounted } from 'vue';

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
      const data: IBundle | IQuestion[] = JSON.parse(event.target!.result as string)
      if ((<IBundle>data).title) {
        store.setModel(data as IBundle);
      } 
      else {
        store.setModel({
          title: 'Füll mich!',
          questions: data as IQuestion[]
        });
      }
    });
    reader.readAsText(fileList[0]);
  }
};

onMounted(() => {
  window.addEventListener('beforeunload', e => {
    if (!store.isSaveToQuit()) {
      e.returnValue = 'There are unsaved changes. Do you really want to quit?';
    }
  });

});
</script>
