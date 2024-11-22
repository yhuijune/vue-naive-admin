/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:25:52
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import type { RouteRecordRaw } from 'vue-router'
import type { CustomRouteMeta } from '@/types/router'
import { defineStore } from 'pinia'
import { useRouterStore } from './router'

interface Tab extends CustomRouteMeta {
  name: RouteRecordRaw['name']
  path: RouteRecordRaw['path']
}

interface TabStoreState {
  tabs: Array<Tab>
  activeTab: Tab['path']
  reloading: boolean
}

const LOADING_DELAY = 100

export const useTabStore = defineStore('tab', {
  state: (): TabStoreState => ({
    tabs: [],
    activeTab: '',
    reloading: false,
  }),
  actions: {
    // 变更选项卡列表
    setTabs(tabs: Array<Tab>) {
      this.tabs = tabs
    },
    // 激活选项卡
    async setActiveTab(path: Tab['path']) {
      await nextTick()
      this.activeTab = path
    },
    // 新增选项卡
    addTab(tab: Tab) {
      const targetIndex = this.tabs.findIndex(({ path }) => path === tab.path)
      if (targetIndex === -1) {
        this.setTabs([...this.tabs, tab])
      }
      this.setActiveTab(tab.path)
    },
    // 重新加载指定选项卡
    async reloadTab(path: Tab['path'], keepAlive: Tab['keepAlive'] = false) {
      try {
        const targetTab = this.tabs.find(item => item.path === path)
        if (!targetTab) return
        if (keepAlive) {
          targetTab.keepAlive = false
        }
        this.reloading = true
        window.$loadingBar.start()
        await nextTick()
        targetTab.keepAlive = !!keepAlive
        this.reloading = false
        setTimeout(() => {
          window.$loadingBar.finish()
        }, LOADING_DELAY)
      } catch (error) {
        console.error(error)
        window.$loadingBar.finish()
      }
    },
    // 关闭选项卡
    async removeTab(path: Tab['path']) {
      this.setTabs(this.tabs.filter(tab => tab.path !== path))
      if (path === this.activeTab) {
        this.toLastTab()
      }
    },
    // 关闭其他选项卡
    removeOtherTabs(path: Tab['path']) {
      this.setTabs(this.tabs.filter(tab => tab.path === path))
      if (path !== this.activeTab) {
        this.toLastTab()
      }
    },
    // 关闭左边选项卡
    removeLeftTabs(path: Tab['path']) {
      const currIndex = this.tabs.findIndex(tab => tab.path === path)
      const restTabs = this.tabs.slice(currIndex)
      this.setTabs(restTabs)
      if (!restTabs.find(tab => tab.path === this.activeTab)) {
        this.toLastTab()
      }
    },
    // 关闭右边选项卡
    removeRightTabs(currPath: Tab['path']) {
      const currIndex = this.tabs.findIndex(({ path }) => path === currPath)
      const restTabs = this.tabs.slice(0, currIndex + 1)
      this.setTabs(restTabs)
      if (!restTabs.find(({ path }) => path === this.activeTab)) {
        this.toLastTab()
      }
    },
    // 选中最后一个选项卡
    toLastTab() {
      const lastTab = this.tabs.at(-1)
      lastTab && useRouterStore().router?.push(lastTab.path)
    },
    // 重置
    resetTabs() {
      this.$reset()
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
