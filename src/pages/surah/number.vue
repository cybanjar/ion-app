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

    <ion-content>
      <detail-surah :detailSurah="data" />
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

export default defineComponent({
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
    });

    onMounted(() => {
      load();
    });

    function load() {
      axios
        .get(`https://api.quran.sutanlab.id/surah/${route.params.number}`)
        .then((response) => {
          state.data = response.data.data;
          state.title = response.data.data.name.transliteration.id;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return {
      ...toRefs(state),
      route,
    };
  },
});
</script>

<style>
</style>