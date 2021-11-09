<template>
  <div class="home-page">
    <div v-loading="store.isLoading">
      <img :src="dogimg" alt="小狗" />
    </div>
    <ElButton
      :loading="store.isLoading"
      type="primary"
      size="small"
      @click="changeDog"
    >
      换小狗
    </ElButton>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'

import { useLoadingStore } from '@/store'
import { getRandomDogPic } from './api/demo'

import HelloWorld from '@/components/HelloWorld.vue'

import vueLogo from '@/assets/logo.png'

const store = useLoadingStore()
const dogimg = ref(vueLogo)

const changeDog = async () => {
  const { message } = await getRandomDogPic()
  dogimg.value = message
}
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
  img {
    width: 250px;
  }
}
</style>
