<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { object, string, type StringSchema } from "yup";
import { useEventBus } from "@vueuse/core";
import { useField, useForm } from "vee-validate";
import type { LoginResponseDto } from "../../dtos/Auth";
import type { ProfileResponseDto } from "../../dtos/Profile";

export interface IEditUserModal {
  show: boolean;
  user: ProfileResponseDto;
}

const data = useState<IEditUserModal>("editUserModal", () => ({
  show: false,
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    pictureUrl: "",
    description: "",
    tags: [],
    experiences: [],
  },
}));

// const validationSchema = object({
//   firstName: string().required("Please enter your first name."),
//   lastName: string().required("Please enter your last name."),
//   pictureUrl: string().url("Either enter a valid link or none, please."),
//   email: string().email("Please enter a valid email."),
//   description: string()
//     .min(60, "Description must be at least 60 characters.")
//     .max(300, "Description must be at most 300 characters.")
//     .required(""),
// });

// const { handleSubmit, errors } = useForm({
//   validationSchema,
//   initialValues: {
//     firstName: data.value.user.firstName,
//     lastName: data.value.user.lastName,
//     email: data.value.user.email,
//     pictureUrl: data.value.user.pictureUrl,
//     description: data.value.user.description,
//   },
// });

// const { value: email } = useField<string>("email");
// const { value: firstName } = useField<string>("firstName");
// const { value: lastName } = useField<string>("lastName");
// const { value: pictureUrl } = useField<string>("pictureUrl");
// const { value: description } = useField<string>("description");

// const submit = handleSubmit(async (values) => {
//   const data = await useApi<LoginResponseDto>("/user/profile", {
//     method: "PATCH",
//     body: values,
//   });
// });

const submit = async () => {
  const { id, tags, experiences, pictureUrl, description, ...body } =
    data.value.user;
  console.log("body", body);
  const res = await useApi<LoginResponseDto>(
    "/user/profile/" + data.value.user.id,
    {
      method: "PATCH",
      body: {
        ...body,
        ...(pictureUrl ? { pictureUrl } : {}),
        ...(description ? { description } : {}),
      },
    }
  );
  console.log(res);
  reset();
};

function reset() {
  data.value.user = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    pictureUrl: "",
    description: "",
    tags: [],
    experiences: [],
  };
  data.value.show = false;
}
</script>

<template>
  <div v-if="data.show" class="modal-backdrop" @click="reset">
    <Form @click.stop v-on:submit="submit" title="Editing...">
      <FormBaseInput
        label="First Name"
        v-model="data.user.firstName"
        :placeholder="'John'"
        type="text"
      />
      <FormBaseInput
        label="Last Name"
        v-model="data.user.lastName"
        :placeholder="'Doe'"
        type="text"
      />
      <FormBaseInput
        label="Email"
        v-model="data.user.email"
        :placeholder="'john.doe@mymail.com'"
        type="email"
      />
      <FormBaseInput
        label="Profile Picture (url)"
        v-model="data.user.pictureUrl"
        :placeholder="'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'"
        type="text"
      />
      <FormBaseInput
        label="Description"
        :placeholder="'Software Engineer specialized in back end development with experience in ...'"
        v-model="data.user.description"
        type="email"
        :is-textarea="true"
      />
    </Form>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
