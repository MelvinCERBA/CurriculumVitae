<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: string | number;
    error: string;
    isTextarea: boolean;
  }>(),
  {
    label: "",
    modelValue: "",
    error: "",
    isTextarea: false,
  }
);
</script>

<template>
  <div class="v-container">
    <div class="h-container">
      <label v-if="label">{{ label }}</label>
      <textarea
        v-if="isTextarea"
        v-bind="$attrs"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        class="field input"
      ></textarea>
      <input
        v-else
        v-bind="$attrs"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        class="field input"
      />
      <!-- <input
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="label"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        class="field"
      /> -->
    </div>
    <p v-if="error" class="errorMessage">
      {{ error ?? "   " }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/colors.scss";
.v-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
.h-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.input {
  border: 0px;
  border-bottom: 1px solid colors.$primary;
  outline: 0px;
  padding: 10px;
  background-color: none;
  flex: 1;

  &:focus {
    border-bottom: 1px solid colors.$primary-active;
  }
}
label {
  flex: 0 0 30%;
  font-size: small;
  align-self: flex-start;
}
.errorMessage {
  color: darkred;
  font-size: 0.8rem;
}
textarea {
  height: 175px;
  font-family: "Inter";
}
</style>
