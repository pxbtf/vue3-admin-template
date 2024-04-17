<template>
  <div class="wh-full">
    <div class="flex">
      <!-- 侧边栏样式 -->
      <Sidebar class="sidebar-container" />
      <div>
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from "./components/AppMain/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: $sidebar-width;
  height: 100%;
  overflow: hidden;
  background-color: $menu-background;
  transition: width 0.28s;
}
</style>
