<template>
  <div class="home">
  <img alt="Vue logo" src="@/assets/logo.png">
  <ScoreLists></ScoreLists>>
  
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScoreLists from '@/views/Score/ScoreLists.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ScoreLists,
  },
});
</script>
