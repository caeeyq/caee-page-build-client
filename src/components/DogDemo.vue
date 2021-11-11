<template>
  <div class="dog-demo">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'

import { getRandomDogPic } from '@/api/demo'
import { useLoadingStore } from '@/store'

import vueLogo from '@/assets/logo.png'

const store = useLoadingStore()
const dogimg = ref(vueLogo)

const changeDog = async () => {
  const { message } = await getRandomDogPic()
  dogimg.value = message
}
</script>

<style lang="scss" scoped>
.dog-demo {
  @include flex-center(column);
  img {
    margin: 16px 0px;
    width: 800px;
    height: 490px;
    object-fit: contain;
  }
}
</style>
