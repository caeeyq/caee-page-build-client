<template>
  <div class="edit-layout">
    <ElContainer>
      <ElHeader>Caee build</ElHeader>
      <ElMain>
        <RouterView></RouterView>
      </ElMain>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElMain } from 'element-plus'
</script>

<style scoped lang="scss">
.edit-layout {
  .el-container {
    height: 100vh;
    .el-header {
      font-weight: bold;
      font-size: 22px;
      border-bottom: 1px solid #dcdfe6;
      line-height: 60px;
    }
    .el-main {
      padding: 0px;
      flex: 1;
    }
  }
}
</style>
