import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/dev-api/api/v1/auth/login",
    method: "post",
    response: () => {
      return {
        code: "200",
        data: {
          accessToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjE2YWJkNTlkOTAxNzQwZDliYmI3ZjczODBhZDkyNzNhIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjkxMTAzMzgyfQ.P4cuIfmPepl3HuguhMS7NXn5a7IUPpsLbmtA_rHOhHk",
          tokenType: "Bearer",
          refreshToken: null,
          expires: null,
        },
        msg: "一切ok",
      };
    },
  },
] as MockMethod[];
