<template>
  <div class="prop-form">
    <el-row v-for="(formItem, key) in propsForms" :key="key" :gutter="8">
      <el-col :span="6" class="prop-form__label">
        <span>{{ formItem.label }}</span>
      </el-col>
      <el-col :span="18">
        <component
          :is="formItem.component"
          :[formItem.valuePropName]="formItem.value"
          v-bind="formItem.extraProps"
          v-on="formItem.emits"
        >
          <template v-if="formItem.subComponent">
            <component
              v-for="option in formItem.options"
              :key="option.value"
              :is="formItem.subComponent"
              v-bind="option.extraProps"
            >
              <RenderJsx :content="option.text" />
            </component>
          </template>
        </component>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { reduce } from 'lodash-es'
import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { RenderJsx } from '@/components'
import { propsFormMap, RealPropForm } from './propFormMap'
export default defineComponent({
  name: 'prop-form',
  components: { RenderJsx },
  props: {
    props: {
      type: Object as PropType<Partial<TextComponentProps>>,
    },
  },
  emits: ['change'],
  setup(props, ctx) {
    const propsForms = computed(() => {
      return reduce(
        props.props,
        (res, curValue, key) => {
          const newKey = key as keyof TextComponentProps
          const formItem = propsFormMap[newKey]
          if (formItem) {
            const {
              initValue,
              outInitValue,
              valuePropName = 'model-value',
              subValuePropName = 'value',
              emitName = 'change',
            } = formItem
            const realFormItem: RealPropForm = {
              ...formItem,
              value: initValue ? initValue(curValue) : curValue,
              valuePropName,
              subValuePropName,
              emitName,
              emits: {
                [emitName]: (e) => {
                  const value = outInitValue ? outInitValue(e) : e
                  const emitValue = { key: newKey, value }
                  ctx.emit('change', emitValue)
                },
              },
            }
            res[newKey] = realFormItem
          }
          return res
        },
        {} as Record<keyof TextComponentProps, RealPropForm>
      )
    })

    return { propsForms }
  },
})
</script>

<style scoped lang="scss">
.prop-form {
  .el-row {
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    &.prop-form__label {
      line-height: 2.4;
      text-align: left;
      font-size: 14px;
      color: var(--el-text-color-regular);
      box-sizing: border-box;
    }
  }
}
</style>
