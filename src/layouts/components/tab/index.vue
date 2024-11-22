<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:50:54
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <div>
    <!-- 选项卡 -->
    <n-tabs
      type="card"
      :value="tabStore.activeTab"
      :closable="isTabClosable"
      @close="handleCloseTab"
    >
      <n-tab
        v-for="tab in tabStore.tabs"
        :key="tab.path"
        :name="tab.path"
        @click="handleClickTab(tab.path)"
        @contextmenu.prevent="handleContextMenu($event, tab.path)"
      >
        {{ tab.title }}
      </n-tab>
    </n-tabs>
    <!-- 右键下拉菜单 -->
    <ContextMenu
      v-model:show="isShowContextMenu"
      v-bind="contextMenuInfo"
    />
  </div>
</template>

<script setup lang="ts">
import type { ContextMenuProps } from './ContextMenu.vue'
import { useTabStore } from '@/store'
import ContextMenu from './ContextMenu.vue'

const router = useRouter()
const tabStore = useTabStore()

const isTabClosable = computed(() => tabStore.tabs.length > 1)

const isShowContextMenu = ref(false)
const contextMenuInfo = shallowRef<ContextMenuProps>({
  x: 0,
  y: 0,
  currentPath: '',
})

function handleCloseTab(path: string) {
  tabStore.removeTab(path)
}

function handleClickTab(path: string) {
  router.push(path)
  tabStore.setActiveTab(path)
}

async function handleContextMenu(evt: MouseEvent, path: string) {
  const { clientX: x, clientY: y } = evt
  contextMenuInfo.value = { x, y, currentPath: path }
  isShowContextMenu.value = true
}
</script>

<style scoped>
:deep(.n-tabs) {
  .n-tabs-tab {
    padding-left: 16px;
    height: 36px;
    background: transparent !important;
    border-radius: 4px !important;
    margin-right: 4px;
    &:hover {
      border: 1px solid rgb(var(--primary-color)) !important;
    }
  }
  .n-tabs-tab--active {
    border: 1px solid rgb(var(--primary-color)) !important;
    background-color: rgba(var(--primary-color), 0.1) !important;
  }
  .n-tabs-pad,
  .n-tabs-tab-pad,
  .n-tabs-scroll-padding {
    border: none !important;
  }
}
</style>
