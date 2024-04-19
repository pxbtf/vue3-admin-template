import NProgress from "nprogress";

import "nprogress/nprogress.css";

NProgress.configure({
  easing: "ease",
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3,
});
export default NProgress;
