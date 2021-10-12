<template>
  <h2>memos</h2>
  <div v-if="isLoading">now loading...</div>
  <div v-show="!isLoading">
    <Suspense>
      <async-memos-index @onLoadComplete="onLoadComplete"></async-memos-index>
    </Suspense>
  </div>
  <router-link to="/add">Add</router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AsyncMemosIndex from './AsyncMemosIndex.vue';

export default defineComponent({
  components: {
    AsyncMemosIndex,
  },
  setup() {
    // start loading
    let isLoading = ref(true);

    const onLoadComplete = () => {
      isLoading.value = false;
    };

    return {
      isLoading,
      onLoadComplete,
    };
  },
});
</script>
