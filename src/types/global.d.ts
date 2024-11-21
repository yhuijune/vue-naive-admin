/// <reference types="vite/client" />

import type { LoadingBarApi } from 'naive-ui'
import 'vue-router'

export { }

declare global {
  // Window
  interface Window {
    $loadingBar: LoadingBarApi
  }
}

declare module 'vue-router' {
  // 路由元信息
  interface RouteMeta {
    title?: string
    layout?: string
  }
}
