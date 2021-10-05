<template>
  <div>score is : {{ score }}</div>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
      console.log(props.score);
    });
  },
};
</script>

