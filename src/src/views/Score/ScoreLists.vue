<template>
  <div>average: {{ averagedScore }}</div>
  <ScoreDisplayItem v-for="(score, key) in scores" :key="key" :score="score" />
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { fetchAllScore } from '@/Utils/api/ScoreApi';
import ScoreDisplayItem from './ScoreDisplayItem';

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

    // compute averaged score
    const averagedScore = computed(() => {
      if (scores.value.length === 0) return 0;
      const sum = scores.value.reduce((p, c) => p + c, 0);
      return sum / scores.value.length || 0;
    });

    return {
      scores,
      averagedScore,
    };
  },
};
</script>
