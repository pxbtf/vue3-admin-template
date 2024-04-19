import { RouteRecordRaw } from "vue-router";
const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");
import { constantRoutes } from "@/router";
import { listRoutes } from "@/api/menu";

/**
 * 判断用户权限角色
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns 是否展示
 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    // 用户角色是root
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles) {
        return route.meta.roles.includes(role);
      }
    });
  }
  return false;
};
/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的（动态）路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步（动态）路由
 *
 */

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpxRoutes = { ...route };
    if (!route.name) {
      tmpxRoutes.name = route.path;
    }
    // 判断用户（角色）是否有该路由的访问权限
    if (hasPermission(roles, route)) {
      if (tmpxRoutes.component?.toString() == "Layout") {
        tmpxRoutes.component = Layout;
      } else {
        const component = modules[`../../views/${tmpxRoutes.component}.vue`];
        if (component) {
          tmpxRoutes.component = component;
        } else {
          tmpxRoutes.component = modules[`../../views/error-page/404.vue`];
        }
      }
      if (tmpxRoutes.children) {
        tmpxRoutes.children = filterAsyncRoutes(tmpxRoutes.children, roles);
      }
    }
  });
  return asyncRoutes;
};
export const usePermissionStore = defineStore("premission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);

  // action
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes);
  }
  /**
   *
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */

  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      listRoutes()
        .then(({ data: asyncRoutes }) => {
          // 根据角色获取有访问权限的路由
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
          setRoutes(accessedRoutes);
          resolve(accessedRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // state 激活后左侧菜单栏的集合
  const mixLeftMenus = ref<RouteRecordRaw[]>([]);
  function setMixLeftMenus(topMenuPath: string) {
    const matchedItem = routes.value.find((item) => item.path === topMenuPath);
    if (matchedItem && matchedItem.children) {
      mixLeftMenus.value = matchedItem.children;
    }
  }
  return {
    routes,
    setRoutes,
    generateRoutes,
    setMixLeftMenus,
    mixLeftMenus,
  };
});
