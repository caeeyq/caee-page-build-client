<template>
  <ElContainer class="editor-page">
    <ElAside class="editor-page__comp-side">组件列表</ElAside>
    <ElContainer class="editor-page__center-content">
      <div class="editor-page__draw-area">
        <div v-for="item in editorStore.ctxComps" :key="item.id">
          {{ item.props.text }}
        </div>
      </div>
    </ElContainer>
    <ElAside class="editor-page__attr-side">组件属性</ElAside>
  </ElContainer>
</template>

<script setup lang="ts">
import { ElAside, ElContainer } from 'element-plus'
import { useEditorStore } from '@/store'

const editorStore = useEditorStore()
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
  .editor-page__center-content {
    background-color: #dcdfe6;
    .editor-page__draw-area {
      @include translate-center;
      background-color: #fff;
      width: 350px;
      height: 600px;
    }
  }
}
</style>
