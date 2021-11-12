import { defineStore } from 'pinia'
import { EditorGetter, EditorState } from './types'
import { v4 as uuid4 } from 'uuid'

export const useEditorStore = defineStore<
  'editorState',
  EditorState,
  EditorGetter
>('editorState', {
  state: () => {
    return {
      components: [
        { id: uuid4(), name: 'CText', props: { text: 'CText demo1' } },
        { id: uuid4(), name: 'CText', props: { text: 'CText demo2' } },
      ],
      currentElement: '',
    }
  },
  getters: {
    ctxComps(state) {
      return state.components
    },
  },
})
