<template>
  <h2>memos</h2>
  <ul>
    <li v-for="memo in memoStore.state.memos" :key="memo.id">
      {{ memo.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { memoKey } from '@/store/memo/memo';

export default defineComponent({
  setup() {
    const memoStore = inject(memoKey);
    if (!memoStore) {
      throw new Error('memo store is not provided');
    }

    return {
      memoStore,
    };
  },
});
</script>
