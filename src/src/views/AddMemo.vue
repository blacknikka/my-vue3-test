<template>
  <h2>Create memo</h2>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <input id="title" v-model="data.title" type="text" />
    </div>
    <div>
      <label for="body">body</label>
      <textarea id="body" v-model="data.body" />
    </div>
    <div>
      <label for="status">status</label>
      <select id="status" v-model="data.status">
        <option value="doing">doing</option>
        <option value="done">done</option>
        <option value="pending">pending</option>
      </select>
    </div>
    <button @click="onSubmit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { memoKey } from '@/store/memo/memo';
import { Params } from '@/store/memo/types';

export default defineComponent({
  setup() {
    const memoStore = inject(memoKey);
    if (!memoStore) {
      throw new Error('memo store is not provided');
    }

    const router = useRouter();

    const data = reactive<Params>({
      title: '',
      body: '',
      status: 'doing',
    });

    const onSubmit = () => {
      const { title, body, status } = data;
      memoStore.addMemo({
        title,
        body,
        status,
      });
      router.push({
        name: 'Memos',
      });
    };

    return {
      onSubmit,
      data,
    };
  },
});
</script>
