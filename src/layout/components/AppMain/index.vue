<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-main {
  min-height: 100%;
  padding-top: $navbar-height;
  border-color: antiquewhite;
}
</style>
