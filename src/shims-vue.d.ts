declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuex'

declare module 'sorted-array' {
  class SortedArray {
    constructor(arr: number[])
    search(element: any): number
  }

  export = SortedArray
}
