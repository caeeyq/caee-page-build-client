<template>
  <ElContainer class="editor-page">
    <ElAside class="editor-page__comp-side">组件列表</ElAside>
    <ElContainer>编辑区域</ElContainer>
    <ElAside class="editor-page__attr-side">组件属性</ElAside>
  </ElContainer>
</template>

<script setup lang="ts">
import { ElAside, ElContainer } from 'element-plus'
</script>

<style scoped lang="scss">
.editor-page {
  &.el-container {
    height: 100%;
  }
  .editor-page__comp-side {
    border-right: 1px solid #dcdfe6;
  }
  .editor-page__attr-side {
    border-left: 1px solid #dcdfe6;
  }
}
</style>
