<template>
  <div>test</div>
  <ScoreDisplayItem
    v-for="(score, key) in scores"
    :score="score"
    :key="key"
  />
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchAllScore } from "@/Utils/api/ScoreApi";
import ScoreDisplayItem from "./ScoreDisplayItem";

export default {
  components: { ScoreDisplayItem },
  setup() {
    let scores = ref([]);

    const fetchScores = async () => {
      const fetchedScores = await fetchAllScore();

      console.log(fetchedScores);

      fetchedScores.forEach((score) => {
        scores.value.push(score);
      });
      console.log(scores.value);
    };

    onMounted(fetchScores);

    return {
      scores,
    };
  },
};
</script>

