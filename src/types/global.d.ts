import type { DialogApi, LoadingBarApi, MessageApi, NotificationApi } from 'naive-ui'

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
