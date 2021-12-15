<template>
  <body>
    <h1>{{ user.id }}</h1>
    <div>{{ user.name }}</div>
    <div>{{ user.email }}</div>

    <button @click="onGoBackClick">go back</button>
  </body>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';
import { userKey } from '@/store/user/user';

export default defineComponent({
  components: {},
  async setup() {
    const userStore = inject(userKey);
    if (!userStore) {
      throw new Error('user store is not provided');
    }

    const router = useRouter();

    const user = await userStore.me();
    console.log(user);

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
