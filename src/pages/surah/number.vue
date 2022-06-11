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
      <loading v-if="isLoading" />
      
      <ion-list
        v-else
        class="ion-margin-bottom"
        v-for="item in data"
        :key="item.number.inSurah"
      >
        <ion-item>
          <ion-button slot="start">{{ item.number.inSurah }}</ion-button>
          <ion-button @click="tafsir(item)" fill="outline" slot="end"
            >Tafsir</ion-button
          >
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-wrap ion-text-right text-arab"
            >{{ item.text.arab }}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-text>{{ item.translation.id }}</ion-text>
        </ion-item>
      </ion-list>
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
  IonList,
  IonItem,
  IonButton,
  IonLabel,
  IonText,
  modalController,
} from "@ionic/vue";
import axios from "axios";
import ModalTafsir from "@/components/TafsirDetail.vue"

export default defineComponent ({
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonList,
    IonItem,
    IonButton,
    IonLabel,
    IonText,
  },
  setup() {
    const route = useRoute();

    const state = reactive({
      data: [],
      title: "",
      isLoading: false,
    });

    onMounted(() => {
      load()
    })

    async function load () {
      state.isLoading = true
      await axios
        .get(`https://api.quran.sutanlab.id/surah/${route.params.number}`)
        .then((response) => {
          state.data = response.data.data.verses
          state.title = response.data.data.name.transliteration.id
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => (state.isLoading = false))
    }

    async function tafsir (item) {
      const modal = await modalController.create({
        component: ModalTafsir,
        componentProps: {
          title: item.number.inSurah,
          tafsir: item.tafsir.id.long,
        },
      });
      return modal.present()
    }

    return {
      ...toRefs(state),
      route,
      tafsir
    }
  }
})
</script>