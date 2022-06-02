<template>
  <div>
    <ion-text>Ready {{ counter.count }}</ion-text>
    <ion-button @click="add">Add</ion-button>
  </div>
</template>

<script>
import { IonText, IonButton } from "@ionic/vue";
import { computed, defineComponent, ref } from "vue";
import { useCounterStore } from "../store/counter";

export default defineComponent({
  components: { IonText, IonButton },
  setup() {
    const count = ref(0);
    const counter = useCounterStore();

    const plusOne = computed({
      get: () => counter.loading,
      set: (val) => {
        counter.loading = val;
      },
    });

    function add() {
      counter.increment();
    }

    return {
      count,
      add,
      counter,
    };
  },
});
</script>

<style>
</style>