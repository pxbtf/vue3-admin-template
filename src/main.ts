import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:svg-icons-register";
import "uno.css";
import router from "@/router";
const app = createApp(App);
import i18n from "@/lang/index";
// 引入暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";
app.use(router);
app.use(i18n);
app.mount("#app");
