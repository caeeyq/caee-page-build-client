<template>
  <div class="common-layout">
    <ElContainer>
      <ElHeader>Caee build</ElHeader>
      <ElMain>
        <RouterView></RouterView>
      </ElMain>
      <ElFooter>Caee ©版权所有</ElFooter>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus'
</script>

<style scoped lang="scss">
.common-layout {
  .el-container {
    height: 100vh;
    .el-header {
      font-weight: bold;
      font-size: 22px;
      border-bottom: 1px solid #dcdfe6;
      line-height: 60px;
    }
    .el-footer {
      font-size: 14px;
      color: #fff;
      line-height: 60px;
      background-color: #0f1725;
    }
    .el-main {
      padding: 0px;
      flex: 1;
    }
  }
}
</style>
