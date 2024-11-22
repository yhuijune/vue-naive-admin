<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:50:48
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <n-dropdown
    placement="bottom-start"
    :show
    :x
    :y
    :options
    @select="handleSelect"
    @clickoutside="handleHideDropdown"
  />
</template>

<script setup lang="ts">
import { useTabStore } from '@/store'

interface TabAction {
  key: string
  label: string
  icon: string
  action: () => void
  disabled: (store: ReturnType<typeof useTabStore>, currentPath?: string) => boolean
}

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  currentPath: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:show'])

// const visible = defineModel('show')

const tabStore = useTabStore()
const route = useRoute()

// 所有的操作
const TAB_ACTIONS: TabAction[] = [
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
      tabStore.removeTab(props.currentPath)
    },
    disabled: store => store.tabs.length <= 1
  },
  {
    key: 'close-other',
    label: '关闭其他',
    icon: 'i-mdi:arrow-expand-horizontal',
    action: () => {
      tabStore.removeOtherTabs(props.currentPath)
    },
    disabled: store => store.tabs.length <= 1
  },
  {
    key: 'close-left',
    label: '关闭左侧',
    icon: 'i-mdi:arrow-expand-left',
    action: () => {
      tabStore.removeLeftTabs(props.currentPath)
    },
    disabled: (store, path) => store.tabs.length <= 1 || path === store.tabs[0].path
  },
  {
    key: 'close-right',
    label: '关闭右侧',
    icon: 'i-mdi:arrow-expand-right',
    action: () => {
      tabStore.removeRightTabs(props.currentPath)
    },
    disabled: (store, path) => store.tabs.length <= 1 || path === store.tabs.at(-1)?.path
  }
]

// 下拉菜单选项
const options = computed(() => {
  return TAB_ACTIONS.map(action => ({
    key: action.key,
    label: action.label,
    icon: () => h('i', { class: `${action.icon} text-14` }),
    disabled: action.disabled(tabStore, props.currentPath)
  }))
})

function handleSelect(key) {
  const targetAction = TAB_ACTIONS.find(tab => tab.key === key)
  targetAction?.action?.(tabStore, props.currentPath)
  handleHideDropdown()
}

function handleHideDropdown() {
  emit('update:show', false)
}
</script>
