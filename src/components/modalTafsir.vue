<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-text>
      <p>{{ tafsir }}</p>
    </ion-text>
  </ion-content>

  <ion-footer>
    <ion-button @click="closeModal" expand="block">Close</ion-button>
  </ion-footer>
</template>

<script>
import {
  IonContent,
  modalController,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
} from "@ionic/vue";
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    title: { type: String, require: true },
    tafsir: { type: String, require: true },
  },
  name: "ModalTafsir",
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonText,
  },
  setup(props) {
    const closeModal = () => {
      modalController.dismiss();
    };

    return {
      ...toRefs(props),
      closeModal,
    };
  },
});
</script>

<style scoped>
p {
  white-space: pre-line;
}
</style>