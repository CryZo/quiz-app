<template>
 <div ref="div">
  <span ref="span">{{ label }}</span>
 </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
  label: string
}>();

const div = ref<HTMLSpanElement|null>(null);
const span = ref<HTMLSpanElement|null>(null);

onMounted(() => {
  if (div.value && span.value) {
    span.value.style.fontSize = `${div.value.clientHeight/4}px`;
  }
});
</script>

<style scoped lang="scss">
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(@/assets/keycap_256.png);
    background-repeat: no-repeat;
    background-size: 100%;

    aspect-ratio: 1;

    span {
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-weight: 700;
      color: #c0c0c0;
      padding-bottom: 25%;
    }
  }
</style>