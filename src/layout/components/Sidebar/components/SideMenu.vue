<template>
  <el-menu
    default-active="2"
    :collapse="appStore.sidder.opened"
    :background-color="variables['menu-background']"
    :text-color="variables['menu-text']"
    :active-text-color="variables['menu-active-text']"
    @open="handleOpen"
    @close="handleClose"
  >
    <SideMenuItem />
  </el-menu>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
const appStore = useAppStore();
import SideMenuItem from "./SideMenuItem.vue";
import variables from "@/styles/variables.module.scss";
const handleOpen = () => {
  console.log("handleOpen");
};
const handleClose = () => {
  console.log("handleClose");
};
defineProps({
  menuList: {
    require: true,
    default: () => {
      return [];
    },
    type: Array<any>,
  },
});
</script>
