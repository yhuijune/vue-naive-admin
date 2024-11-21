import type { DialogApi, LoadingBarApi, MessageApi, NotificationApi } from 'naive-ui'
import 'vue-router'

export { }

declare global {
  // Window
  interface Window {
    $loadingBar: LoadingBarApi
    $notification: NotificationApi
    $message: MessageApi
    $dialog: DialogApi
  }
}

declare module 'vue-router' {
  // 路由元信息
  interface RouteMeta {
    title?: string
    layout?: string
  }
}
