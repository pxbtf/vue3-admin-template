import { loginApi } from "@/api/auth/index";
import { LoginData } from "@/api/auth/types";
import { defineStore } from "pinia";
import { getUserInfoApi } from "@/api/user/index";
import { UserInfo } from "@/api/user/types";
import { resetRouter } from "@/router";
export const useUserStore = defineStore("user", () => {
  const user = ref<UserInfo>({
    roles: [],
    perms: [],
  });
  function login(loginDate: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginDate)
        .then((response) => {
          const { tokenType, accessToken } = response.data;
          localStorage.setItem("accessToken", tokenType + " " + accessToken);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  // 获取信息（用户昵称 头像 角色集合 权限集合）
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfoApi()
        .then(({ data }) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
            return;
          }
          Object.assign(user.value, { ...data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  // 重置token
  function resetToken() {
    return new Promise<void>((resolve) => {
      localStorage.setItem("accessToken", "");
      resetRouter();
      resolve();
    });
  }
  return {
    login,
    getUserInfo,
    user,
    resetToken,
  };
});
