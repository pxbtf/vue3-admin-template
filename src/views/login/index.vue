<template>
  <div class="text-blue pos-absolute login-page">
    <h2>登录页面</h2>

    <el-card>
      <el-form ref="userRef" :rules="rules" :model="user">
        <el-form-item prop="username" label="账号">
          <el-input v-model="user.username" style="width: 340px" type="text" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="user.password"
            style="width: 340px"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm">登录</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from "element-plus";
import { useUserStore } from "@/store";
import { LoginData } from "@/api/auth/types";
const userStore = useUserStore();
const user = ref<LoginData>({
  username: "",
  password: "",
});
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};
const validatePassWord = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<typeof user>>({
  username: [{ validator: validateUserName, trigger: "blur" }],
  password: [{ validator: validatePassWord, trigger: "blur" }],
});
const userRef = ref<FormInstance>();
const submitForm = () => {
  userRef.value?.validate((valid: boolean) => {
    if (valid) {
      userStore.login(user.value).then((data) => {
        console.log(data);
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.login-page {
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  margin-left: -250px;
}
</style>
