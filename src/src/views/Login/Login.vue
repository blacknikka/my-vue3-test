<template>
  <body>
    <h1>Login</h1>
    <div>
      <label for="user">user name</label>
      <input id="user" v-model="user" type="text" />
    </div>
    <div>
      <label for="password">password</label>
      <input id="passowrd" v-model="password" type="password" />
    </div>
    <button type="button" @click="onLoginClick">Submit</button>
  </body>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { userKey } from '@/store/user/user';

export default defineComponent({
  setup() {
    const userStore = inject(userKey);
    if (!userStore) {
      throw new Error('user store is not provided');
    }

    const router = useRouter();

    let user = ref('');
    let password = ref('');

    const onLoginClick = async () => {
      console.log('onLoginClick');
      const result: boolean = await userStore.login(user.value, password.value);
      if (result) {
        console.log('login success');
        router.push({
          name: 'MyPage',
        });
      } else {
        console.log('error');
      }
    };

    return {
      user,
      password,
      onLoginClick,
    };
  },
});
</script>
