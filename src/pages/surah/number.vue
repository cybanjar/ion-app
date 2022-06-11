<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :scroll-events="true">
      <loading v-if="isLoading" />
      <detail-surah v-else :detailSurah="data" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/vue";
import axios from "axios";
import DetailSurah from "@/components/DetailSurah.vue";

export default defineComponent ({
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    DetailSurah,
  },
  setup() {
    const route = useRoute();

    const state = reactive({
      data: [],
      title: "",
      isLoading: false,
    });

    onMounted(() => {
      load();
    });

    async function load() {
      state.isLoading = true
      await axios
        .get(`https://api.quran.sutanlab.id/surah/${route.params.number}`)
        .then((response) => {
          state.data = response.data.data.verses
          state.title = response.data.data.name.transliteration.id;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => (state.isLoading = false));
    }

    return {
      ...toRefs(state),
      route,
    };
  }
})
</script>

<style>
</style>