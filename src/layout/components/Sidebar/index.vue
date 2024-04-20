<template>
  <slideMenu :menu-list="permissionStore.routes" base-path=""></slideMenu>
</template>

<script setup lang="ts">
import slideMenu from "./components/SideMenu.vue";
import { usePermissionStore } from "@/store";
const permissionStore = usePermissionStore();
console.log("permissionStore路径", permissionStore.routes);
</script>
