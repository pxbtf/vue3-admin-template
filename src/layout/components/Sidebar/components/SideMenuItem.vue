<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 拥有单个子路由的菜单或没有子路由的福路由 -->
    <template
      v-if="
        IshasOneChild(item.children, item as RouteRecordRaw) &&
        (!OneChild.children || OneChild.noShowChild) &&
        !item.meta?.alwaysShow
      "
    >
      <AppLink v-if="OneChild.meta" :to="resolvePath(OneChild.path)">
        <el-menu-item :index="resolvePath(OneChild.path)">
          <SideMenuItemTitle :title="OneChild.meta.title" :icon="OneChild.meta.icon || (item.meta && item.meta.icon)" />
        </el-menu-item>
      </AppLink>
    </template>
    <!-- 拥有子路由 -->
    <el-sub-menu v-else :index="resolvePath(item.path)">
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
import { RouteRecordRaw } from "vue-router";
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
const OneChild = ref(); // 临时 唯一子路由

/**
 *
 * 判断当前路由是否只有一个子路由
 * @param children
 * @param parent 当前路由
 */
function IshasOneChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
  // 过滤不显示的子路由
  const childrenRoute = children.filter((route: RouteRecordRaw) => {
    if (route.meta?.hidden) {
      // 当hidden为true时，不显示子路由
      return false;
    } else {
      route.meta!.hidden = false;
      OneChild.value = route;
      return true;
    }
  });
  // 如果只有一个子路由，就返回true
  if (childrenRoute.length === 1) {
    return true;
  }

  // 如果没有子路由，显示父级路由
  if (childrenRoute.length === 0) {
    OneChild.value = { ...parent, path: "", noShowChild: false };
    return true;
  }
  return false;
}
</script>
