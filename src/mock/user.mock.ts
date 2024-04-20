import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/dev-api/api/v1/users/info",
    method: "get",
    response: () => {
      return {
        code: "200",
        data: {
          userId: 2,
          nickname: "系统管理员",
          username: "admin",
          avatar: "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
          roles: ["ADMIN"],
          perms: [
            "sys:menu:delete",
            "sys:dept:edit",
            "sys:dict_type:add",
            "sys:dict:edit",
            "sys:dict:delete",
            "sys:dict_type:edit",
            "sys:menu:add",
            "sys:user:add",
            "sys:role:edit",
            "sys:dept:delete",
            "sys:user:edit",
            "sys:user:delete",
            "sys:user:reset_pwd",
            "sys:dept:add",
            "sys:role:delete",
            "sys:dict_type:delete",
            "sys:menu:edit",
            "sys:dict:add",
            "sys:role:add",
          ],
        },
      };
    },
  },
] as MockMethod[];
