<!-- 侧栏标题 -->
<template>
  <el-icon v-if="icon && icon.startsWith('el-icon')" class="sub-el-icon">
    <component :is="icon.replace('el-icon-', '')" />
  </el-icon>
  <svg-icon v-else-if="icon" :icon-class="icon" />
  <svg-icon v-else icon-class="menu" />
  <span class="nav">{{ title }}</span>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.nav {
  color: var(--menu-text);
}
</style>
