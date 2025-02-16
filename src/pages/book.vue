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
      <loading v-if="loading" />
      <list-book v-else :dataHadist="books"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
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
import { useHaditsStore } from '@/store/hadits'

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
    const { loadBooks, books, loading } = useHaditsStore()
    
    onMounted(() => {
      loadBooks()
    })

    return {
      books,
      loading,
    }
  }
});
</script>
