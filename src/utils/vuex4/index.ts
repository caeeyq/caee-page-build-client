export default function createStore<S>(options: StoreOptions<S>) {
  return new Store(options)
}

class Store<S> {
  constructor(options: StoreOptions<S>) {
    console.log(options)
  }
}

interface StoreOptions<S> {
  state?: S
  getters?: GetterTree<S, S>
  mutations?: MutationTree<S>
  actions?: ActionTree<S, S>
}

interface GetterTree<S, RS> {
  [key: string]: Getter<S, RS>
}

type Getter<S, RS> = (
  state: S,
  getters: any,
  rootState: RS,
  rootGetters: any
) => any

interface MutationTree<S> {
  [key: string]: Mutation<S>
}

type Mutation<S> = (state: S, payload?: any) => void

interface ActionTree<S, RS> {
  [key: string]: Action<S, RS>
}

type Action<S, RS> = (context: ActionContext<S, RS>, payload?: any) => any

interface ActionContext<S, RS> {
  dispatch: Dispatch
  commit: Commit
  state: S
}

type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
