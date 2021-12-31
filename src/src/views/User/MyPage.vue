<template>
  <body>
    <h1>{{ user.name }}</h1>
    <div>{{ user.id }}</div>
    <div>{{ user.email }}</div>

    <button @click="onMemoClick">memos</button>
    <button @click="onLogoutClick">logout</button>
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

    // logout
    const onLogoutClick = async () => {
      const ok: boolean = await userStore.logout();
      if (ok) {
        router.replace({
          name: 'Login',
        });
      } else {
        console.log('logout failed');
      }
    };

    // memo
    const onMemoClick = () => {
      router.push({
        name: 'Memos',
      });
    };

    return {
      user,
      onLogoutClick,
      onMemoClick,
    };
  },
});
</script>
