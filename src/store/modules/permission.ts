import { RouteRecordRaw } from "vue-router";

export const usePermissionStore = defineStore("premission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);

  // action

  //   state 激活后左侧菜单栏的集合
  const MenuLeft = ref<RouteRecordRaw[]>([]);

  return {
    routes,
    MenuLeft,
  };
});
