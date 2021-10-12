<template>
  <h2>memos</h2>
  <ul>
    <li v-for="memo in memoStore.state.memos" :key="memo.id" @click="onClick(memo.id)">
      {{ memo.title }}
    </li>
  </ul>
  <router-link to="/add">Add</router-link>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { memoKey } from '@/store/memo/memo';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const memoStore = inject(memoKey);
    if (!memoStore) {
      throw new Error('memo store is not provided');
    }

    memoStore.fetchAll();

    const router = useRouter();

    const onClick = (id: string): void => {
      router.push({
        name: 'MemoDetails',
        params: {
          id,
        },
      });
    };

    return {
      memoStore,
      onClick,
    };
  },
});
</script>
