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
      <ion-text>Hadist</ion-text>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonText,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonText,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
  },
});
</script>
