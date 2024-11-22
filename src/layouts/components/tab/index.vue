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
      @close="(path) => tabStore.removeTab(path)"
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
      v-if="contextMenuOption.show"
      v-model:show="contextMenuOption.show"
      :x="contextMenuOption.x"
      :y="contextMenuOption.y"
      :current-path="contextMenuOption.currentPath"
    />
  </div>
</template>

<script setup lang="ts">
import { useTabStore } from '@/store'
import ContextMenu from './ContextMenu.vue'

const router = useRouter()
const tabStore = useTabStore()

const isTabClosable = computed(() => tabStore.tabs.length > 1)

const contextMenuOption = reactive({
  show: false,
  x: 0,
  y: 0,
  currentPath: '',
})

function handleClickTab(path) {
  router.push(path)
  tabStore.setActiveTab(path)
}

function showContextMenu() {
  contextMenuOption.show = true
}
function hideContextMenu() {
  contextMenuOption.show = false
}
function setContextMenu(x, y, currentPath) {
  Object.assign(contextMenuOption, { x, y, currentPath })
}

async function handleContextMenu(evt, path) {
  const { clientX, clientY } = evt
  hideContextMenu()
  setContextMenu(clientX, clientY, path)
  await nextTick()
  showContextMenu()
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
