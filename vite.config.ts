import { ConfigEnv, UserConfig, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icon from "unplugin-icons/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
const srcPath = path.resolve(__dirname, "src");
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);

  return {
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "xxxxx",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": srcPath,
      },
    },
    css: {
      // css 预处理器
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
        eslintrc: {
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        resolvers: [ElementPlusResolver(), IconsResolver({})],
        vueTemplate: true,
        dts: path.resolve(srcPath, "types", "auto-import.d.ts"),
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconsResolver({ enabledCollections: ["ep"] })],
        dts: path.resolve(srcPath, "types", "components.d.ts"),
      }),
      Icon({
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(srcPath, "assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      UnoCSS({}),
    ],
  };
});
