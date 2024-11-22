// 定义路由元信息接口
export interface CustomRouteMeta {
  title?: string
  layout?: string
  icon?: string
  keepAlive?: boolean
}

// 扩展 vue-router
declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta { }
}
