<script lang="ts" setup>
import type { TagCategoryResponseDto, TagResponseDto } from "../dtos/Tag";
import { useRuntimeConfig } from "#app";

const props = defineProps<{
  tags: string[];
}>();

const config = useRuntimeConfig();
const { data: categories, error } = await useFetch<TagCategoryResponseDto[]>(
  `http://localhost:3000/tag/category`
);

function applyTag(tag: string) {
  if (!props.tags.includes(tag)) {
    props.tags.push(tag);
    input.value = null;
  }
}

const suggestion: Ref<string[]> = ref([]);
const input = ref(null);

watchEffect(async () => {
  if (input.value) {
    const suggestedTags = await $fetch<TagResponseDto[]>(
      `http://localhost:3000/autocompletion`,
      {
        method: "POST",
        body: {
          query: input.value,
        },
      }
    );
    suggestion.value = suggestedTags.map(
      (tag: TagResponseDto): string => tag.name
    );
    console.log(suggestion.value);
    return;
  }
  suggestion.value = [];
});
</script>

<template>
  <div class="searchbar">
    <div class="tags-bar shadow">
      <p v-for="tag in props.tags" class="tag">{{ tag }}</p>
      <p
        v-for="tag in suggestion"
        class="suggested-tag"
        @click.prevent="applyTag(tag)"
      >
        {{ tag }}
      </p>
      <input
        type="text"
        placeholder="Big Data, Python, TS ..."
        v-model="input"
      />
    </div>
    <div v-if="error" class="tag-groups">{{ error }}</div>
    <!-- <div v-else-if="categories" class="tag-groups">
      <div
        v-for="category in categories"
        :key="category.id"
        class="tag-group shadow clickable"
      >
        <p>{{ category.name }}</p>
      </div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.searchbar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0px;
  gap: 10px;
  margin-bottom: 50px;
}

.tag-groups {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.tag-group {
  margin-right: 15px;
  background-color: white;
  padding: 2px 10px;
  border-radius: 30px;
}

.tags-bar {
  appearance: none;
  border: 0px;
  outline: none;
  border-radius: 30px;
  padding: 10px 20px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  > .tag {
    padding: 2px 10px;
    border-radius: 15px;
    border: 1px solid gray;
    color: gray;
    margin-right: 5px;

    &::before {
      content: "#";
    }

    &:hover {
      background-color: lightgray;
    }
  }

  > .suggested-tag {
    padding: 1px 5px;
    margin-right: 2px;
    border-radius: 15px;
    color: gray;

    &::before {
      content: "#";
    }

    &:hover {
      border: 1px solid lightgray;
    }
  }

  > input {
    appearance: none;
    border: 0px;
    outline: none;
    align-self: stretch;
  }
}
</style>
