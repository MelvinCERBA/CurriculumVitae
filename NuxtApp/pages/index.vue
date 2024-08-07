<script lang="ts" setup>
import type { ProfileResponseDto } from "../dtos/Profile";

const tags: Ref<string[]> = ref([]);
const {
  data: users,
  error,
  refresh,
} = await useAsyncData<ProfileResponseDto[]>("users", () =>
  useApi<ProfileResponseDto[]>("/user/profile", {
    method: "POST",
    body: { tags: tags.value },
  })
);

watch(
  tags,
  async () => {
    console.log("newUsers ?");
    const newUsers = await useApi<ProfileResponseDto[]>("/user/profile", {
      method: "POST",
      body: { tags: tags.value },
    });
    console.log(newUsers.map((user) => user.email));
    users.value = newUsers;
  },
  { deep: true }
);

function toggleTag(tag: string) {
  if (!tags.value.includes(tag)) {
    tags.value.push(tag);
    return;
  }
  tags.value = tags.value.filter((t) => t !== tag);
}
</script>

<template>
  <h1>Search a talent</h1>
  <div class="profile-catalogue">
    <SearchBar :tags="tags" :toggleTag="toggleTag" />
    <div class="profiles-list">
      <ProfileCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        :tags="tags"
        :toggleTag="toggleTag"
        :clickable="true"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/global.scss";

.profile-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
}
</style>
