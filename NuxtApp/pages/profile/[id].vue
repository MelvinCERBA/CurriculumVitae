<script lang="ts" setup>
import type { ExperienceResponseDto } from "../../dtos/Experiences";
import type { ProfileResponseDto } from "../../dtos/Profile";

const tags: Ref<string[]> = ref([]);

const { data: user, error } = useAsyncData<ProfileResponseDto>(
  "myProfile",
  () => useApi("/user/profile/" + useRouteParam("id"))
);

function toggleTag(tag: string) {
  if (!tags.value.includes(tag)) {
    tags.value.push(tag);
    return;
  }
  tags.value = tags.value.filter((t) => t !== tag);
}

watch(
  tags,
  async () => {
    if (!user.value) return;
    const newExperiences = await useApi<{ data: ExperienceResponseDto[] }>(
      "/experience/search/",
      {
        method: "POST",
        body: {
          userId: user.value?.id,
          tagNames: tags.value,
        },
      }
    );
    user.value.experiences = newExperiences.data;
  },
  { deep: true }
);
</script>

<template>
  <div v-if="user" class="">
    <ProfileCard
      :key="user.id"
      :user="user"
      :tags="tags"
      :toggleTag="toggleTag"
      :clickable="false"
    />
    <h2>My experiences</h2>
    <div class="profile-catalogue">
      <SearchBar :tags="tags" :toggleTag="toggleTag" />
      <div class="profiles-list">
        <ExperienceCard
          v-for="exp in user.experiences"
          :key="exp.id"
          :experience="exp"
          :tags="tags"
          :toggleTag="toggleTag"
        />
      </div>
    </div>
  </div>
  <div v-else-if="error" class="">error</div>
  <div v-else class="">Loading ...</div>
</template>

<style scoped>
h2 {
  margin-top: 50px;
  margin-bottom: 10px;
}
</style>
