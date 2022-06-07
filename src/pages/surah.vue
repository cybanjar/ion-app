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
      <Suspense>
        <template #default>
          <list-surah :dataSurah="data" />
        </template>
        <template #fallback>
          <ion-title class="ion-text-center">Loading ...</ion-title>
        </template>
      </Suspense>
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
  toastController,
} from "@ionic/vue";

import ListSurah from "../components/ListSurah";

import { defineComponent, onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import { checkmark } from "ionicons/icons";

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
      getSurah();
    });

    async function getSurah() {
      try {
        const res = await axios.get("https://api.quran.sutanlab.id/surah/");
        state.data = res.data.data;
        state.message = res.data.message;

        openToast();
      } catch (err) {
        console.error(err);
      }
    }

    async function openToast() {
      const toast = await toastController.create({
        message: state.message,
        duration: 2000,
        color: "primary",
        position: "top",
        icon: checkmark,
        animated: true,
      });
      return toast.present();
    }

    return {
      ...toRefs(state),
    };
  },
});
</script>