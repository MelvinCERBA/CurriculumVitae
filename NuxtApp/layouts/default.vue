<script lang="ts" setup>
const jwt = useState("jwt_token", () => "");
</script>

<template>
  <div class="layout">
    <nav class="nav">
      <div>
        <NuxtLink class="link" to="/" :class="{ current: $route.path === '/' }">
          <span class="text">Home</span>
        </NuxtLink>
      </div>
      <div>
        <template v-if="!jwt.length">
          <NuxtLink
            class="link"
            to="/register"
            :class="{ current: $route.path === '/' }"
          >
            <span class="text">Register</span>
          </NuxtLink>
          <NuxtLink
            class="link"
            to="/login"
            :class="{ current: $route.path === '/' }"
          >
            <span class="text">Log in</span>
          </NuxtLink>
        </template>
        <template v-else>
          <p class="link" @click="jwt = ''">
            <span class="text">Log out</span>
          </p>
        </template>
      </div>
    </nav>
    <slot />
    <EditUserModal />
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

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
}
</style>
