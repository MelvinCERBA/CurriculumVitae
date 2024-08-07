<script lang="ts" setup>
import type { ExperienceResponseDto } from "../dtos/Experiences";

const props = defineProps<{
  experience: ExperienceResponseDto;
  tags: string[];
  toggleTag: (tag: string) => void;
}>();
</script>

<template>
  <div class="experience-card" v-bind="$attrs">
    <div class="experience-picture">
      <img
        :src="
          experience.pictureUrl ||
          'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
        "
      />
    </div>
    <div class="experience-info">
      <h2 class="experience-name">
        {{ `${experience.title}` }}
      </h2>
      <p class="experience-description">{{ experience.description }}</p>
      <div class="experience-tags">
        <div
          v-for="tag in experience.tags"
          class="tag shadow"
          :class="tags.includes(tag.name) ? 'active' : ''"
          @click="toggleTag(tag.name)"
        >
          {{ tag.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/colors.scss";
.experience-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 20px;
  gap: 50px;
  border-radius: 5px;

  > h2 {
    &:hover {
      color: colors.$primary;
    }
  }
}

.experience-tags {
  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
}

.tag {
  padding: 2px 10px;
  border-radius: 15px;
  border: 1px solid lightgray;
  color: gray;

  &::before {
    content: "#";
  }

  &.active {
    color: colors.$primary;
    border-color: colors.$primary;
  }
}

.experience-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.experience-picture {
  img {
    width: 100px;
    height: 100px;
    border-radius: 10%;
  }
}
</style>
