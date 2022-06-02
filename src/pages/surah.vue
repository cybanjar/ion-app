<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Al-Qur'an</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <list-surah :dataSurah="data" />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonHeader,
} from "@ionic/vue";

import ListSurah from "../components/ListSurah";

import { defineComponent, onMounted, reactive, toRefs } from "vue";
import axios from "axios";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    ListSurah,
  },
  setup() {
    const state = reactive({
      data: [],
    });

    onMounted(() => {
      getSurah();
    });

    const getSurah = async () => {
      try {
        const res = await axios.get("https://api.quran.sutanlab.id/surah/");
        state.data = res.data.data;
      } catch (err) {
        console.error(err);
      }
    };

    return {
      ...toRefs(state),
    };
  },
});
</script>