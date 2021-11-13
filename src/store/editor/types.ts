import { TextComponentProps } from '@/components/BusinessComps/CText/types'
import { _ActionsTree } from 'pinia'

export interface ComponentData {
  id: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Partial<TextComponentProps>
}

export interface EditorState {
  components: ComponentData[]
  currentElement: string
}

interface DeleteComp {
  (compId: string[]): void
  (compId: string): void
}
export interface EditorActions extends _ActionsTree {
  addComp: (comp: Partial<TextComponentProps>) => void
  deleteComp: DeleteComp
}
