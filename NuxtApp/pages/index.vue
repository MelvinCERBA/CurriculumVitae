<script lang="ts" setup>
const tags: Ref<string[]> = ref([]);
</script>

<template>
  <h1>Search a talent</h1>
  <div class="profile-catalogue">
    <SearchBar :tags="tags" />
    <div class="profiles-list">
      <div class="profile-card clickable">
        <div class="profile-picture">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          />
        </div>
        <div class="profile-info">
          <h2 class="profile-name">John Doe</h2>
          <p class="profile-description">Developer</p>
          <div class="profile-tags">
            <div class="tag shadow">Javascript</div>
            <div class="tag shadow">Python</div>
            <div class="tag shadow">Ruby</div>
          </div>
        </div>
      </div>
      <div class="profile-card clickable">
        <div class="profile-picture">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          />
        </div>
        <div class="profile-info">
          <h2 class="profile-name">John Doe</h2>
          <p class="profile-description">Developer</p>
          <div class="profile-tags">
            <div class="tag shadow">Javascript</div>
            <div class="tag shadow">Python</div>
            <div class="tag shadow">Ruby</div>
          </div>
        </div>
      </div>
      <div class="profile-card clickable">
        <div class="profile-picture">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          />
        </div>
        <div class="profile-info">
          <h2 class="profile-name">John Doe</h2>
          <p class="profile-description">Developer</p>
          <div class="profile-tags">
            <div class="tag shadow">Javascript</div>
            <div class="tag shadow">Python</div>
            <div class="tag shadow">Ruby</div>
          </div>
        </div>
      </div>
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

.profile-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 20px;
  gap: 50px;
  border-radius: 30px;

  &:hover {
    box-shadow: 0 0 10px lightgray;
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
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.profile-picture {
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
