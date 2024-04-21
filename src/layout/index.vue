<template>
  <div class="wh-full">
    <!-- 侧边栏样式 -->
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
      </div>
      <AppMain />
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

.main-container {
  position: relative;
  min-height: 100%;
  margin-left: $sidebar-width;
  transition: margin-left 0.28s;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - $sidebar-width);
}
</style>
