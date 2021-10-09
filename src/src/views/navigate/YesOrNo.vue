<template>
  <teleport to="body">
    <div v-if="modal" class="modal">
      <div>
        <div>{{ title }}</div>
        <div>{{ question }}</div>
        <div><button @click="onClickYes">Yes</button></div>
        <div><button @click="onClickNo">No</button></div>
        <div><button @click="onClickClose">Close</button></div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    modal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['eventClickYes', 'eventClickNo', 'eventClickClose'],
  setup(props, context) {
    const onClickYes = () => {
      context.emit('eventClickYes');
    };

    const onClickNo = () => {
      context.emit('eventClickNo');
    };

    const onClickClose = () => {
      context.emit('eventClickClose');
    };

    return {
      onClickYes,
      onClickNo,
      onClickClose,
    };
  },
});
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
