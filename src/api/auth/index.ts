// src/api/auth/index.ts
import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginData, LoginResult } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  return request({
    url: "/api/v1/auth/login",
    method: "post",
    params: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
