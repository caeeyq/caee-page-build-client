import { defineStore } from 'pinia'
import { v4 as uuid4 } from 'uuid'
import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { EditorActions, EditorState } from './types'
import { isString } from 'lodash'

export const useEditorStore = defineStore<
  'editorState',
  EditorState,
  Record<string, never>,
  EditorActions
>('editorState', {
  state: () => ({
    currentElement: '',
    components: [],
  }),
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
