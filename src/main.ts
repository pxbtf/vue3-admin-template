import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "@/store";
import { setupElIcons, setupI18n } from "@/plugins";
import "./style.css";
import "virtual:svg-icons-register";
import "uno.css";
// 引入暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
const app = createApp(App);
// 全局注册store
setupStore(app);
// 全局注册图标
setupElIcons(app);
// 国际化
setupI18n(app);
app.use(router).mount("#app");
