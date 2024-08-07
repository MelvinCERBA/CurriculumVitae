<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { ref as yupref, object, string, number, boolean } from "yup";
import type { LoginResponseDto } from "../dtos/Auth";
import { useRouter } from "vue-router";

const router = useRouter();

const validationSchema = object({
  email: string().email("Please enter a valid email.").required(""),
  password: string().required("Please enter a password"),
  passwordConfirmation: string()
    .label("confirm password")
    .required()
    .oneOf([yupref("password")], "Passwords must match"),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
    passwordConfirmation: "",
  },
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: passwordConfirmation } = useField<string>(
  "passwordConfirmation"
);

const submit = handleSubmit(async (values) => {
  const data = await useApi<LoginResponseDto>("/authentication/login", {
    method: "POST",
    body: { email: values.email, password: values.password },
  });
  const jwt = useState("jwt_token");
  const loggedUserId = useState("loggedUserId");
  jwt.value = data.token;
  loggedUserId.value = data.userId;
  router.push("/");
  console.log("here");
});
</script>

<template>
  <Form v-on:submit="submit" title="Login">
    <FormBaseInput
      label="Email"
      v-model="email"
      :error="errors.email"
      type="email"
    />
    <FormBaseInput
      label="Password"
      type="password"
      v-model="password"
      :error="errors.password"
    />
    <FormBaseInput
      label="Confirm Password"
      type="password"
      v-model="passwordConfirmation"
      :error="errors.passwordConfirmation"
    />
  </Form>
</template>

<style scoped></style>
