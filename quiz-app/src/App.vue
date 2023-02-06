<template>
  <main class="w-full h-screen overflow-hidden">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  router.push({name: 'splash'});
});
</script>