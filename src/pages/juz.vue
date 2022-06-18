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
      <list-juz />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue"
import ListJuz from '@/components/ListJuz.vue'

export default defineComponent({
  name: "JuzPage",
  components: {
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton,
    ListJuz
  },
});
</script>

<style>

</style>