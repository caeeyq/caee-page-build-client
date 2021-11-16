import { _ActionsTree, _GettersTree } from 'pinia'

import { TextComponentProps } from '@/components/BusinessComps/CText/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeyValue<T = any> = { key: string; value: T }

export interface ComponentData {
  id: string
  name: string
  props: Partial<TextComponentProps>
}

export interface EditorState {
  /** 所有编辑区域组件 */
  components: ComponentData[]
  /** 当前选中组件ID */
  currentElementId: string
}

interface DeleteComp {
  (compId: string[]): void
  (compId: string): void
}

export interface EditorActions extends _ActionsTree {
  /** 添加组件到编辑区域 */
  addComp: (comp: Partial<TextComponentProps>) => void
  /** 删除编辑区域指定组件 */
  deleteComp: DeleteComp
  /** 更新当前组件的值 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateCurrentComp: (e: KeyValue) => void
}

export interface EditorGetters extends _GettersTree<EditorState> {
  /** 当前选中组件信息 */
  currentElement: (editorState: EditorState) => ComponentData | undefined
}
