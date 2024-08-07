<script lang="ts" setup>
import type { ProfileResponseDto } from "../dtos/Profile";
import { useRouter } from "vue-router";
import type { IEditUserModal } from "./edit/UserModal.vue";

const router = useRouter();
const props = defineProps<{
  user: ProfileResponseDto;
  tags: string[];
  toggleTag: (tag: string) => void;
  clickable: boolean;
}>();
const editUserData = useState<IEditUserModal>("editUserModal");
const loggedUserId = useState<number | null>("loggedUserId");

function onClick() {
  if (props.clickable) {
    router.push(`/profile/${props.user.id}`);
  }
}

function edit() {
  editUserData.value.show = true;
  editUserData.value.user = props.user;
  console.log(editUserData.value.user);
}
</script>

<template>
  <div class="profile-card" v-bind="$attrs">
    <div
      class="profile-picture"
      :class="clickable ? 'clickable' : ''"
      @click="onClick"
    >
      <img
        :src="
          user.pictureUrl ||
          'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
        "
      />
    </div>
    <div class="profile-info">
      <div class="h-container">
        <h2
          class="profile-name"
          :class="clickable ? 'clickable' : ''"
          @click="onClick"
        >
          {{ `${user.firstName} ${user.lastName}` }}
        </h2>
        <h3 v-if="loggedUserId == user.id" @click="edit" class="edit">
          Edit ...
        </h3>
      </div>
      <p class="profile-description">{{ user.description }}</p>
      <div class="profile-tags">
        <div
          v-for="tag in user.tags"
          class="tag shadow"
          :class="tags.includes(tag) ? 'active' : ''"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/colors.scss";
.profile-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 20px;
  gap: 50px;
  border-radius: 30px;

  > h2 {
    &:hover {
      color: colors.$primary;
    }
  }
}

.profile-tags {
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

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
}

.profile-picture {
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}

.profile-description {
  height: 50px;
}

h2 {
  &.clickable:hover {
    color: colors.$primary-active;
  }
}

.h-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > .edit {
    color: colors.$primary;

    &:hover {
      color: colors.$primary-active;
    }
  }
}
</style>
