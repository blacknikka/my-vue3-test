<template>
  <div>test</div>
  <ScoreDisplayItem
    v-for="(score, key) in scores"
    :key="key"
    :score="score"
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

