<template>
  <suspense>
    <AsyncUserFiled />
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AsyncUserFiled from '@/views/User/AsyncUserField.vue';

export default defineComponent({
  components: { AsyncUserFiled },
});
</script>
