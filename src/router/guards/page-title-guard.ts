/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:25:00
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import type { Router } from 'vue-router'

const baseTitle = import.meta.env.VITE_TITLE

export default function createPageTitleGuard(router: Router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.title
    document.title = pageTitle ? `${baseTitle} | ${pageTitle}` : baseTitle
  })
}