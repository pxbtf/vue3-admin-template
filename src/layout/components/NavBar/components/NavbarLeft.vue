<template>
  <div class="flex">
    <hamburger :is-active="appStore.sidebar.opened" @toggle-click="toggleSideBar" />
    <!-- 导航栏页面路径显示 -->
    <Breadcrumb />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
const appStore = useAppStore();
function toggleSideBar() {}
</script>
