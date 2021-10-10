<template>
  <body>
    <h1>{{ memo.title }}</h1>
    <div>{{ memo.body }}</div>
    <div>{{ memo.status }}</div>

    <button @click="onGoBackClick">go back</button>
    <button @click="onEditClick">edit</button>
    <button @click="onDeleteClick">delete</button>
    <yes-or-no
      title="確認"
      question="削除しますか"
      :modal="YorN"
      @eventClickClose="eventClickClose"
      @eventClickYes="eventClickYes"
      @eventClickNo="eventClickNo"
    ></yes-or-no>
  </body>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { memoKey } from '@/store/memo/memo';
import YesOrNo from '@/views/navigate/YesOrNo.vue';

export default defineComponent({
  components: {
    YesOrNo,
  },
  setup() {
    let YorN = ref(false);
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

    // go back
    const onGoBackClick = () => {
      router.back();
    };

    // delete
    const onDeleteClick = () => {
      YorN.value = true;
    };

    // edit
    const onEditClick = () => {
      router.push({
        name: 'EditMemo',
        params: {
          id,
        },
      })
    };

    const onEventClickClose = () => {
      YorN.value = false;
    };

    const onEventClickNo = () => {
      YorN.value = false;
    };

    const onEventClickYes = () => {
      YorN.value = false;
      memoStore.deleteMemo(id);
      router.back();
    };

    return {
      memo,
      onGoBackClick,
      onDeleteClick,
      onEditClick,
      YorN,
      eventClickYes: onEventClickYes,
      eventClickNo: onEventClickNo,
      eventClickClose: onEventClickClose,
    };
  },
});
</script>
