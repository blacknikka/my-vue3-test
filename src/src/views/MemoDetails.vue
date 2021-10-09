<template>
  <h1>{{ memo.title }}</h1>
  <div>{{ memo.body }}</div>
  <div>{{ memo.status }}</div>

  <button @click="onGoBackClick">go back</button>
  <button @click="onDeleteClick">delete</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { memoKey } from '@/store/memo/memo';

export default defineComponent({
  setup() {
    const memoStore = inject(memoKey);
    if (!memoStore) {
      throw new Error('memo store is not provided');
    }

    const route = useRoute();
    const router = useRouter();

    if (!('id' in route.params)) {
      throw new Error(`id is invalid. route.params => ${route.params}`);
    }
    const id = Number(route.params.id);

    const memo = memoStore.getMemo(id);

    const onGoBackClick = () => {
      router.back();
    };

    const onDeleteClick = () => {
      memoStore.deleteMemo(id);
      router.back();
    };

    return {
      memo,
      onGoBackClick,
      onDeleteClick,
    };
  },
});
</script>
