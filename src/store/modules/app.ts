import defaultSettings from "@/settings";
// 导入 Element Plus 中英文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

import { store } from "@/store";
export const useAppStore = defineStore("app", () => {
  const language = useStorage("language", defaultSettings.language);

  /**
   * 根据语言标识读取对应的语言包
   */
  const locale = computed(() => {
    if (language?.value == "en") {
      return en;
    } else {
      return zhCn;
    }
  });
  /**
   * 侧边栏开关
   */
  const sidebar = reactive({ opened: false });
  /**
   * 切换语言
   */
  function changeLanguage(val: string) {
    language.value = val;
  }

  return {
    language,
    locale,
    sidebar,
    changeLanguage,
  };
});

export function useAppStoreHook() {
  return useAppStore(store);
}
