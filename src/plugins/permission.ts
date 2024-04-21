import router from "@/router";
import { usePermissionStore, useUserStore } from "@/store";
import NProgress from "@/utils/nprogress";
import { RouteRecordRaw } from "vue-router";

// 启动项目后首先做的事情
export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"];
  // 配置路由前置守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // 判断是否有token
    const hasToken = localStorage.getItem("accessToken");
    if (hasToken) {
      // 判断是否去登陆页
      if (to.path === "/login") {
        // 已经登陆，跳转首页
        next("/");
        NProgress.done();
      } else {
        const userStore = useUserStore();
        const hasRoles = userStore.user.roles && userStore.user.roles.length > 0;
        if (hasRoles) {
          // 未匹配到任何路由, 跳转404
          // 说明跳转的路径不是用户有权限访问的路径或者是一个错误路径
          if (to.matched.length === 0) {
            from.name ? next({ name: from.name }) : next("/404");
          } else {
            next();
          }
        } else {
          const permissionStore = usePermissionStore();
          // 获得用户登录的角色
          const { roles } = await userStore.getUserInfo();

          const accessedRoutes = await permissionStore.generateRoutes(roles);

          console.log("获取用户权限的路由", accessedRoutes);
          try {
            // 获得权限内可访问的路由信息并添加到路由表中
            accessedRoutes.forEach((route: RouteRecordRaw) => {
              router.addRoute(route);
            });
            next({ ...to, replace: true });
          } catch (error) {
            // 移除token 重新登录
            await userStore.resetToken();
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      // 用户未登录
      // 先判断是否是白名单
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        // 前往登录页面
        next(`/login?redirect=${to.path}`);
      }
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
