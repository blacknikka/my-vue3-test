<template>
  <body>
    <h1>{{ user.name }}</h1>
    <div>{{ user.id }}</div>
    <div>{{ user.email }}</div>

    <button @click="onGoBackClick">go back</button>
  </body>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { userKey } from '@/store/user/user';
import { UserStore } from '@/store/user/types';

export default defineComponent({
  components: {},
  setup() {
    const userStore = inject<UserStore>(userKey);
    if (!userStore) {
      throw new Error('user store is not provided');
    }

    const user = reactive({
      id: null as null | number,
      name: '',
      email: '',
    });

    onMounted(async () => {
      const me = await userStore.me();
      user.id = me.id;
      user.name = me.name;
      user.email = me.email;
    });

    const router = useRouter();

    // go back
    const onGoBackClick = () => {
      router.back();
    };

    return {
      user,
      onGoBackClick,
    };
  },
});
</script>
