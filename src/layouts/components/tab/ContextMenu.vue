<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:50:48
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <n-dropdown
    :key="currentPath"
    placement="bottom-start"
    :show="visible"
    :x
    :y
    :options
    @select="handleSelectOption"
    @clickoutside="hideDropdown"
  />
</template>

<script setup lang="ts">
import { useTabStore } from '@/store'

export interface ContextMenuProps {
  x: number
  y: number
  currentPath: string
}

interface TabOption {
  key: string
  label: string
  icon: string
  action: () => void
  disabled: (store: ReturnType<typeof useTabStore>, currentPath?: string) => boolean
}

const { x = 0, y = 0, currentPath = '' } = defineProps<ContextMenuProps>()
const visible = defineModel('show')

const tabStore = useTabStore()
const route = useRoute()

// 操作列表
const TAB_OPTIONS: Array<TabOption> = [
  {
    key: 'reload',
    label: '重新加载',
    icon: 'i-mdi:refresh',
    action: () => {
      tabStore.reloadTab(route.fullPath, route.meta?.keepAlive)
    },
    disabled: (store, path) => path !== store.activeTab,
  },
  {
    key: 'close',
    label: '关闭',
    icon: 'i-mdi:close',
    action: () => {
      tabStore.removeTab(currentPath)
    },
    disabled: store => store.tabs.length <= 1
  },
  {
    key: 'close-other',
    label: '关闭其他',
    icon: 'i-mdi:arrow-expand-horizontal',
    action: () => {
      tabStore.removeOtherTabs(currentPath)
    },
    disabled: store => store.tabs.length <= 1
  },
  {
    key: 'close-left',
    label: '关闭左侧',
    icon: 'i-mdi:arrow-expand-left',
    action: () => {
      tabStore.removeLeftTabs(currentPath)
    },
    disabled: (store, path) => store.tabs.length <= 1 || path === store.tabs[0].path
  },
  {
    key: 'close-right',
    label: '关闭右侧',
    icon: 'i-mdi:arrow-expand-right',
    action: () => {
      tabStore.removeRightTabs(currentPath)
    },
    disabled: (store, path) => store.tabs.length <= 1 || path === store.tabs.at(-1)?.path
  }
]

// 下拉菜单选项
const options = computed(() => TAB_OPTIONS.map(action => ({
  key: action.key,
  label: action.label,
  icon: () => h('i', { class: `${action.icon} text-14` }),
  disabled: action.disabled(tabStore, currentPath)
})))

function handleSelectOption(key: TabOption['key']) {
  const targetAction = TAB_OPTIONS.find(tab => tab.key === key)
  targetAction?.action?.()
  hideDropdown()
}

function hideDropdown() {
  visible.value = false
}
</script>
