<template>
  <el-tooltip :effect="Effect.DARK" :content="label" placement="top">
    <div :class="classStyle" @click="$emit('change')">
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { Effect } from 'element-plus'
import { computed } from 'vue'

const props = defineProps<{
  value: boolean
  label: string
}>()

defineEmits<{
  (e: 'change'): void
}>()

const classStyle = computed(() => {
  return {
    'round-check-box': true,
    'round-check-box--active': props.value,
  }
})
</script>

<style lang="scss" scoped>
.round-check-box {
  @include flex-center;
  cursor: pointer;
  width: 28px;
  height: 28px;
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  &.round-check-box--active {
    background-color: #409eff;
    color: white;
  }
}
</style>
