import request from "@/utils/request";

/**
 * 获取路由列表
 * @returns
 */
export function listRoutes() {
  return request({
    url: "/api/v1/menus/routes",
    method: "get",
  });
}
