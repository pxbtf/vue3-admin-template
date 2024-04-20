// 创建路由器实例
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "Dashboard",
          icon: "homepage",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
];
// 创建路由器实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
// 重置路由
export function resetRouter() {
  router.replace({ path: "/login" });
}
// 导出路由
export default router;
