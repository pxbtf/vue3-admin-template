<template>
  <div class="navbar-container">
    <!-- 导航栏左侧 -->
    <NavbarLeft />
    <!-- 导航栏右侧 -->
    <NavbarRight />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $navbar-height;
  background: var(--el-bg-color);
}
</style>
