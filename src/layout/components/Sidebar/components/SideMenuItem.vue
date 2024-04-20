<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 拥有单个子路由的菜单或没有子路由的福路由 -->
    <template> </template>
    <!-- 拥有子路由 -->
    <el-sub-menu :index="resolvePath(item.path)">
      <template #title>
        <SideMenuItemTitle v-if="item.meta" :title="item.meta.title" :icon="item.meta && item.meta.icon" />
      </template>
      <SideMenuItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>
<script lang="ts" setup>
import SideMenuItemTitle from "./SideMenuItemTitle.vue";
import path from "path-browserify";
import { isExternal } from "@/utils/index";
defineOptions({
  name: "SideMenuItem",
  inheritAttrs: false,
});
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
});
function resolvePath(routePath: string) {
  // 判断是否是外链
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  const fullPath = path.resolve(props.basePath, routePath);
  return fullPath;
}
</script>
