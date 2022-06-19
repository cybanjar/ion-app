<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Juz {{ route.params.id}} </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <loading v-if="isLoading" />
      <ion-list
        v-else
        v-for="item in data"
        :key="item.number.inSurah"
        class="ion-margin-bottom"
      >
        <ion-item v-if="item.number.inSurah === 1">
          <ion-label class="text-arab ion-text-center"> {{ basmalah.arab }} </ion-label>
        </ion-item>
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
          <ion-text> {{ item.translation.id }}</ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  modalController,
} from "@ionic/vue"
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import ModalTafsir from '@/components/TafsirDetail.vue'
import bismillah from '@/data/bismillah.json'

export default defineComponent({
  name: "DetailJuz",
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
  },

  setup() {
    const route = useRoute()

    const state = reactive({
      data     : [],
      isLoading: false,
      basmalah : bismillah
    })
    onMounted(() => {
      juz()
    })

    async function juz () {
      state.isLoading = true
      await axios.get(`https://api.quran.sutanlab.id/juz/${route.params.id}`)
      .then((response) => {
        state.data = response.data.data.verses
      })
      .catch((err) => {
        console.error(err)
      })
      .then(() => {
        state.isLoading = false
      })
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
      tafsir,
    }
  }
})
</script>

<style>

</style>