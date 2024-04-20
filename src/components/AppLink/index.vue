<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { isExternal } from "@/utils/index";
defineOptions({
  name: "AppLink",
  inheritAttrs: false,
});
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
// 判断是否是外链
const isExternalLink = computed(() => isExternal(props.to));
const type = computed(() => {
  return isExternalLink.value ? "a" : "router-link";
});
const linkProps = (to: string) => {
  return isExternalLink.value ? { href: to, target: "_bank", rel: "noopener noreferrer" } : { to };
};
</script>
