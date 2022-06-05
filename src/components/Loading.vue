<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-container">
      <ion-img src="@/assets/image/send.svg"></ion-img>
    </div>
  </div>
</template>

<script lang="ts">
import { IonImg } from "@ionic/vue";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  components: { IonImg },
});
</script>

<style>
</style>