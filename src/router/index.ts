/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:25:23
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { basicRoutes } from './basic-routes'
import setupRouterGuards from './guards'

export const router = createRouter({
  history: import.meta.env.VITE_USE_HASH === 'true'
    ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH || '/')
    : createWebHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default async function setupRouter(app: App) {
  setupRouterGuards(router)
  app.use(router)
}
