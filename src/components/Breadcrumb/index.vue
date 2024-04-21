<template>
  <el-breadcrumb class="flex-y-center">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <!-- 当前页面位置 不需要再跳转 -->
      <span class="color-gray-400" v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1">{{
        item.meta.title
      }}</span>
      <a v-else @click.prevent="handleClick(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import router from "@/router";
import { RouteLocationMatched } from "vue-router";
import { compile } from "path-to-regexp";
const currentRoute = useRoute();
const breadcrumbs = ref<Array<RouteLocationMatched>>([]);

// 获得面包屑形式的路由数据
function getBreadcrumb() {
  let matched = currentRoute.matched.filter((item) => item.meta && item.meta.title);
  console.log(" currentRoute.matched", matched);
  const first = matched[0];
  if (!isDashboard(first)) {
    matched = [{ path: "/dashboard", meta: { title: "dashboard" } } as any].concat(matched);
  }
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumbs !== false;
  });
}
function isDashboard(route: RouteLocationMatched) {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.toString().trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
}
const pathCompile = (path: string) => {
  const { params } = currentRoute;
  const toPath = compile(path);
  return toPath(params);
};
function handleClick(item: any) {
  const { path, redirect } = item;
  if (redirect) {
    router.push(redirect).catch((err) => {
      console.warn(err);
    });
    return;
  }
  router.push(pathCompile(path)).catch((err) => {
    console.warn(err);
  });
}
// 监听路由变化，显示路由面包屑
watch(
  () => currentRoute.path,
  (path) => {
    if (path.startsWith("/redirect/")) {
      return;
    }
    getBreadcrumb();
  }
);

onBeforeMount(() => {
  getBreadcrumb();
});
</script>
