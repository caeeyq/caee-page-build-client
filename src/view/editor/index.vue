<template>
  <el-container class="editor-page">
    <el-aside class="editor-page__comp-side">
      <h2>组件列表</h2>
      <ShowCompsList
        :compList="initComps"
        @addComp="(item) => editorStore.addComp(item)"
      />
    </el-aside>
    <el-container class="editor-page__center-content">
      <div class="editor-page__draw-area">
        <div
          v-for="item in editorStore.components"
          class="editor-page__item-wrapper"
          :class="getItemWrapperClass(item)"
          :key="item.id"
          @click.capture.stop="selectComp(item.id)"
        >
          <component :is="item.name" v-bind="item.props"></component>
        </div>
      </div>
    </el-container>
    <el-aside class="editor-page__attr-side">
      <h2>组件属性</h2>
      <template v-if="editorStore.currentElement">
        <PropFormList
          :props="editorStore.currentElement.props"
          @change="handleChange"
        />
      </template>
      <pre style="margin-top: 24px">{{ editorStore.currentElement }}</pre>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useEditorStore } from '@/store'
import { CText, ShowCompsList, PropFormList } from '@/components'
import { initComps } from './initData'
import { ComponentData, KeyValue } from '@/store/editor/types'

export default defineComponent({
  name: 'editor-page',
  components: {
    CText,
    ShowCompsList,
    PropFormList,
  },
  setup() {
    const editorStore = useEditorStore()

    const selectComp = (compId: string) => {
      editorStore.currentElementId = compId
    }
    const getItemWrapperClass = (item: ComponentData) => {
      return {
        'editor-page__item-wrapper--active':
          item.id === editorStore.currentElementId,
      }
    }
    const handleChange = (e: KeyValue) => {
      editorStore.updateCurrentComp(e)
    }

    return {
      editorStore,
      initComps,
      selectComp,
      getItemWrapperClass,
      handleChange,
    }
  },
})
</script>

<style scoped lang="scss">
.editor-page {
  &.el-container {
    height: 100%;
  }
  .editor-page__comp-side {
    border-right: 1px solid #dcdfe6;
    padding: 16px;
    h2 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 18px;
    }
  }
  .editor-page__attr-side {
    border-left: 1px solid #dcdfe6;
    padding: 16px;
    h2 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 18px;
    }
  }
  .editor-page__center-content {
    background-color: #dcdfe6;
    .editor-page__draw-area {
      @include translate-center;
      background-color: #fff;
      width: 350px;
      height: 600px;
      .editor-page__item-wrapper {
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid transparent;
        &:hover {
          border: 1px dashed grey;
        }
        &.editor-page__item-wrapper--active {
          border: 1px solid blue;
        }
      }
    }
  }
}
</style>
