import { _GettersTree } from 'pinia'

interface ComponentData {
  id: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>
}

export interface EditorState {
  components: ComponentData[]
  currentElement: string
}

export interface EditorGetter extends _GettersTree<EditorState> {
  ctxComps: (state: EditorState) => ComponentData[]
}
