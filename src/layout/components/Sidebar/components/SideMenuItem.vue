<template>
  <el-sub-menu index="1">
    <template #title>
      <SideMenuItemTitle title="首页" icon="el-icon-Odometer" />
    </template>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <document />
      </el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-sub-menu>
</template>
<script lang="ts" setup>
import { Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import SideMenuItemTitle from "./SideMenuItemTitle.vue";
</script>
