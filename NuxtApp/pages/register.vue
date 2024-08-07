<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { ref as yupref, object, string, number, boolean } from "yup";
import type { LoginResponseDto } from "../dtos/Auth";
import { useRouter } from "vue-router";

const router = useRouter();

const validationSchema = object({
  firstName: string().required("Please enter your name."),
  lastName: string().required("Please enter your last name."),
  email: string().email("Please enter a valid email.").required(""),
  pictureUrl: string().url("Either enter a valid link or none, please."),
  description: string()
    .min(60, "Description must be at least 60 characters.")
    .max(300, "Description must be at most 300 characters.")
    .required(""),
  password: string().required("Please enter a password"),
  passwordConfirmation: string()
    .label("confirm password")
    .required()
    .oneOf([yupref("password")], "Passwords must match"),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    pictureUrl: "",
    description: "",
    password: "",
    passwordConfirmation: "",
  },
});

const { value: email } = useField<string>("email");
const { value: firstName } = useField<string>("firstName");
const { value: lastName } = useField<string>("lastName");
const { value: pictureUrl } = useField<string>("pictureUrl");
const { value: description } = useField<string>("description");
const { value: password } = useField<string>("password");
const { value: passwordConfirmation } = useField<string>(
  "passwordConfirmation"
);

const submit = handleSubmit(async (values) => {
  const data = await useApi<LoginResponseDto>("/user/login", {
    method: "POST",
    body: { email: values.email, password: values.password },
  });
  const jwt = useState("jwt_token");
  jwt.value = data.token;
  router.push("/");
  console.log("here");
});
</script>

<template>
  <Form v-on:submit="submit" title="Login">
    <FormBaseInput
      label="First Name"
      v-model="firstName"
      :error="errors.firstName"
      :placeholder="'John'"
      type="text"
    />
    <FormBaseInput
      label="Last Name"
      v-model="lastName"
      :error="errors.lastName"
      :placeholder="'Doe'"
      type="text"
    />
    <FormBaseInput
      label="Email"
      v-model="email"
      :error="errors.email"
      :placeholder="'john.doe@mymail.com'"
      type="email"
    />
    <FormBaseInput
      label="Profile Picture (url)"
      v-model="pictureUrl"
      :error="errors.pictureUrl"
      :placeholder="'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'"
      type="text"
    />
    <FormBaseInput
      label="Description"
      v-model="description"
      :error="errors.description"
      :placeholder="'Software Engineer specialized in back end development with experience in ...'"
      type="email"
      :is-textarea="true"
    />
    <FormBaseInput
      label="Password"
      type="password"
      v-model="password"
      :error="errors.password"
      :placeholder="'p455w0rD'"
    />
    <FormBaseInput
      label="Confirm Password"
      type="password"
      v-model="passwordConfirmation"
      :error="errors.passwordConfirmation"
      :placeholder="'p455w0rD'"
    />
  </Form>
</template>

<style scoped lang="scss"></style>
