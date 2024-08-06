<script lang="ts" setup></script>

<template>
  <div class="layout">
    <nav class="nav">
      <NuxtLink class="link" to="/" :class="{ current: $route.path === '/' }">
        <span class="text">Home</span>
      </NuxtLink>
    </nav>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/global.scss";
@use "@/assets/styles/colors.scss";

.layout {
  width: 620px;
  margin: 50px auto 50px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.link {
  color: colors.$primary;
  margin: 0px 10px 0px 0px;

  &:hover {
    color: colors.$primary-active;
  }
}
</style>
