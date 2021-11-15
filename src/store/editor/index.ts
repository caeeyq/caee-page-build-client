import { defineStore } from 'pinia'
import { isString } from 'lodash'
import { v4 as uuid4 } from 'uuid'

import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { EditorActions, EditorGetters, EditorState } from './types'

export const useEditorStore = defineStore<
  'editorState',
  EditorState,
  EditorGetters,
  EditorActions
>('editorState', {
  state: () => ({
    currentElementId: '',
    components: [],
  }),
  getters: {
    currentElement(state) {
      return state.components.find((comp) => comp.id === state.currentElementId)
    },
  },
  actions: {
    addComp(comp: Partial<TextComponentProps>) {
      this.components.push({
        id: uuid4(),
        name: 'c-text',
        props: comp,
      })
    },
    deleteComp(compIds) {
      if (isString(compIds)) {
        this.components = this.components.filter((comp) => comp.id !== compIds)
      } else {
        this.components = this.components.filter(
          (comp) => !compIds.includes(comp.id)
        )
      }
    },
  },
})
