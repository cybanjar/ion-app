<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Hadist</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <loading v-if="isLoading" />
      <list-book v-else :dataHadist="data"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/vue"

import ListBook from '@/components/ListBook.vue'
import axios from 'axios'
import { hadistLocal } from '@/api/config'

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    ListBook,
  },

  setup() {
    const state = reactive({
      data: [],
      isLoading: false
    })

    onMounted(() => {
      getHadist()
    })

    async function getHadist () {
      try {
        state.isLoading = true

        const res = await axios.get(`${hadistLocal}/books`)
        state.data = res.data.data

        state.isLoading = false
      } catch (err) {
        console.error(err)
      }
    }

    return {
      ...toRefs(state),
      getHadist,
    }
  }
});
</script>
