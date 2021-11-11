<template>
  <div class="app-wrapper">
    <ElMenu
      default-active="home"
      class="app-wrapper__menu"
      mode="horizontal"
      router
    >
      <ElMenuItem index="/">首页</ElMenuItem>
      <ElMenuItem index="demo">Dog Demo</ElMenuItem>
    </ElMenu>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElMenu, ElMenuItem } from 'element-plus'
</script>

<style scoped lang="scss">
.app-wrapper {
  @include flex-center(column);
  .app-wrapper__menu {
    width: 1200px;
  }
}
</style>
