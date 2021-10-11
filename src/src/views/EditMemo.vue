<template>
  <body>
    <h1>edit memo</h1>
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
      <button type="button" @click="onSubmit">Submit</button>
      <button type="button" @click="onCancelClick">cancel</button>
    </form>
  </body>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue';
import { memoKey } from '@/store/memo/memo';
import { useRoute, useRouter } from 'vue-router';
import { Params, Memo } from '@/store/memo/type';

export default defineComponent({
  async setup() {
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

    // get id from store.
    const targetMemo: Memo = await memoStore.getMemo(id);

    let data = reactive<Params>({
      title: targetMemo.title,
      body: targetMemo.body,
      status: targetMemo.status,
    });

    const onSubmit = () => {
      console.log('onSubmit');
      memoStore.updateMemo(id, {
        title: data.title,
        body: data.body,
        status: data.status,
      });
      router.push({
        name: 'Memos',
      });
    };

    const onCancelClick = () => {
      router.push({
        name: 'Memos',
      });
    };

    return {
      data,
      onSubmit,
      onCancelClick,
    };
  },
});
</script>
