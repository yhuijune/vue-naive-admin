/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:24:53
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import type { Router } from 'vue-router'

export default function createPageLoadingGuard(router: Router) {
  router.beforeEach(() => {
    window.$loadingBar.start()
  })

  router.afterEach(() => {
    setTimeout(() => {
      window.$loadingBar.finish()
    }, 200)
  })

  router.onError(() => {
    window.$loadingBar.error()
  })
}
