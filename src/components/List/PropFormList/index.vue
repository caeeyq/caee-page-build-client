<template>
  <div class="prop-form">
    <el-row
      v-for="(formItem, key) in propsForms"
      :key="key"
      align="middle"
      :gutter="8"
    >
      <el-col :span="6" class="prop-form__label">
        <span>{{ formItem.label }}</span>
      </el-col>
      <el-col :span="18">
        <component
          :is="formItem.component"
          :[formItem.valuePropName!]="formItem.value"
          @[formItem.emitName!]="valueChange"
          v-bind="formItem.extraProps"
        >
          <template v-if="formItem.subComponent">
            <component
              v-for="option in formItem.options"
              :key="option.value"
              :is="formItem.subComponent"
              :label="option.text"
              :[formItem.subValuePropName!]="option.value"
            >
              {{ option.text }}
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
import { propsFormMap, PropsForms } from './propFormMap'
export default defineComponent({
  name: 'prop-form',
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
              valuePropName = 'model-value',
              subValuePropName = 'value',
              emitName = 'change',
            } = formItem
            formItem.value = initValue ? initValue(curValue) : curValue
            formItem.valuePropName = valuePropName
            formItem.subValuePropName = subValuePropName
            formItem.emitName = emitName
            res[newKey] = formItem
          }
          return res
        },
        {} as Required<PropsForms>
      )
    })

    const valueChange = (v: any) => {
      ctx.emit('change', v)
    }

    return { propsForms, valueChange }
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
      text-align: left;
      font-size: 14px;
      color: var(--el-text-color-regular);
      box-sizing: border-box;
    }
  }
}
</style>
