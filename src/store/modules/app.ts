/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:25:31
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import type { Layout } from '@/settings'
import type { ThemeCommonVars } from 'naive-ui'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { generate, getRgbStr } from '@arco-design/color'
import { defaultLayout, defaultPrimaryColor, naiveThemeOverrides } from '@/settings'

interface AppState {
  collapsed: boolean
  isDark: boolean
  layout: Layout
  primaryColor: string
  naiveThemeOverrides: Record<'common', Partial<ThemeCommonVars>>
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    collapsed: false,
    isDark: useDark().value,
    layout: defaultLayout,
    primaryColor: defaultPrimaryColor,
    naiveThemeOverrides,
  }),
  actions: {
    // 收起展开导航
    switchCollapsed() {
      this.collapsed = !this.collapsed
    },
    // 切换模式
    toggleDark() {
      this.isDark = !this.isDark
    },
    // 设置布局
    setLayout(layout: Layout) {
      this.layout = layout
    },
    // 设置主题色
    setPrimaryColor(primaryColor: string) {
      this.primaryColor = primaryColor
    },
    // 设置主题色和布局
    setThemeColor(color: string, isDark: boolean) {
      const colors = generate(
        color ?? this.primaryColor,
        {
          list: true,
          dark: isDark ?? this.isDark,
        },
      )
      const [hoverColor, primaryColor, pressedColor] = colors.splice(4)
      document.body.style.setProperty('--primary-color', getRgbStr(primaryColor))
      this.naiveThemeOverrides.common = {
        ...(this.naiveThemeOverrides.common || {}),
        primaryColor,
        primaryColorHover: hoverColor,
        primaryColorSuppl: hoverColor,
        primaryColorPressed: pressedColor,
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
