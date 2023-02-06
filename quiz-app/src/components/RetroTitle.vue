<script setup lang="ts">
defineProps<{
  title: string,
}>();
</script>

<template>
    <div class="relative">
        <span class="retro-title-border">{{ title }}</span>
        <span class="retro-title">{{ title }}</span>
    </div>
</template>

<style lang="scss" scoped>
$font-size: 2.5rem;
$font-border: calc($font-size / 16);
$font-border-color: #9B93AB;

.retro-title {
    min-width: calc($font-size / 4);
    position: relative;
    display: inline-block;
    overflow: hidden;
    font-size: $font-size;
    background: linear-gradient(#1F194C 0%, #313A89 10%, #FDF8FE 49%, #2C111D 51%, #AC3890 60%, #EDE7F8 100%) text;
    color: transparent;
}
.retro-title-border {
    pointer-events: none;
    min-width: calc($font-size / 4);
    position: absolute;
    // top:  calc($font-border * -1);
    display: inline-block;
    overflow: hidden;
    font-size: $font-size;
    // padding-top: $font-border;

    -webkit-text-stroke-width: $font-border;
    -webkit-text-stroke-color: $font-border-color;
    
    // text-shadow:
    //     calc($font-border *-1) calc($font-border *-1) $font-border-color,
    //     calc($font-border *-1) $font-border $font-border-color,
    //     $font-border calc($font-border *-1) $font-border-color,
    //     $font-border $font-border $font-border-color;
}
</style>
