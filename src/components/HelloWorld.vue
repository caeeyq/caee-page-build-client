<template>
  <div class="demo-helloworld">
    <h1>vite+vue3+ts 通用模板</h1>
    <p>{{ msg }}</p>
    <p>
      <span>推荐 IDE：</span>
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
      <span>+</span>
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>
    <p>
      <span>参考文档：</span>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Docs
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
      |
      <a href="https://pinia.esm.dev/" target="_blank">Pina Docs</a>
      |
      <a href="https://element-plus.gitee.io/zh-CN/" target="_blank">
        Element plus Docs
      </a>
    </p>
    <p>你可以从 <code>README.md</code> 获取更多信息。</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style scoped lang="scss">
.demo-helloworld {
  line-height: 32px;
  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 52px;
    margin-top: 10px;
  }
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
}
</style>
