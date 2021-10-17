<template>
  <ul>
    <li v-for="memo in memoStore.state.memos" :key="memo.id" @click="onClick(memo.id)">
      {{ memo.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { memoKey } from '@/store/memo/memo';
import { useRouter } from 'vue-router';

export default defineComponent({
  emits: ['onLoadComplete'],
  async setup(_, context) {
    const memoStore = inject(memoKey);
    if (!memoStore) {
      throw new Error('memo store is not provided');
    }

    const router = useRouter();

    const onClick = (id: string): void => {
      router.push({
        name: 'MemoDetails',
        params: {
          id,
        },
      });
    };

    // start loading
    await memoStore.fetchAll();
    context.emit('onLoadComplete');

    return {
      memoStore,
      onClick,
    };
  },
});
</script>
