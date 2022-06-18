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
      <loading v-if="isLoading" />
      <list-surah v-else :dataSurah="data" />
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
import axios from 'axios';

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
      isLoading: false,
      message: "",
    });

    onMounted(() => {
      load()
    })

    async function load() {
      const local = localStorage.getItem('surah')
      if (local !== null) {
        state.data = await JSON.parse(local)
      } else {
        getSurah()
      }
    }

    async function getSurah() {
      try {
        state.isLoading = true;
        const res = await axios.get("https://api.quran.sutanlab.id/surah/");
        state.data = res.data.data;

        localStorage.setItem('surah', JSON.stringify(state.data))
        state.message = res.data.message;

        state.isLoading = false;
      } catch (err) {
        console.error(err);
      }
    }

    return {
      ...toRefs(state),
    };
  },
});
</script>