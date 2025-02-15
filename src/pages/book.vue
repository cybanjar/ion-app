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
import { getBooks } from "@/api/hadits"

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
      load()
    })

    async function load () {
      state.isLoading = true
      try {
        const res = await getBooks()
        state.data = res.data
      } catch (error) {
        console.error(error)
      } finally {
        state.isLoading = false
      }
    }

    return {
      ...toRefs(state),
      load
    }
  }
});
</script>
