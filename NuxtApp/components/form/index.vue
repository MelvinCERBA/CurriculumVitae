<script lang="ts" setup>
const emit = defineEmits<{
  (event: "submit"): void;
}>();
const { title } = withDefaults(defineProps<{ title: string | null }>(), {
  title: null,
});
</script>

<template>
  <form @submit.prevent="$emit('submit')" class="shadow">
    <h2>{{ title }}</h2>
    <slot></slot>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped lang="scss">
@use "@/assets/styles/colors.scss";
@use "@/assets/styles/global.scss";

h2 {
  text-align: center;
  color: colors.$primary;
}
form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: white;
  border-radius: 30px;
  width: 70%;
  align-self: center;
  padding: 30px;
  gap: 30px;
}

button {
  appearance: none;
  padding: 10px 20px;
  border: 1px solid colors.$primary;
  color: colors.$primary;
  outline: none;
  border-radius: 30px;
  background-color: white;

  &:hover {
    border: 1px solid colors.$primary-active;
    color: colors.$primary-active;
  }
}
</style>
