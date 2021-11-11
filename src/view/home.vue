<template>
  <div class="home-page">
    <HelloWorld
      msg="模板技术栈： Vue3 全家桶 + TypeScript + Vite + element-plus + pinia"
    />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<style scoped lang="scss">
.home-page {
  @include flex-center(column);
  width: 1200px;
}
</style>
