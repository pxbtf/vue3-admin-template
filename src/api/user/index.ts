import { AxiosPromise } from "axios";
import { UserInfo } from "./types";
import request from "@/utils/request";
export function getUserInfoApi(): AxiosPromise<UserInfo> {
  return request({
    url: "/api/v1/users/info",
    method: "get",
  });
}
