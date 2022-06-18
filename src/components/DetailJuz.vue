<template>
  <ion-list
    class="ion-margin-bottom"
  >
    <ion-item>
      <ion-button slot="start">inSurah</ion-button>
      <ion-button fill="outline" slot="end"
        >Tafsir</ion-button
      >
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap ion-text-right text-arab"
        >text.arab
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-text>translation.id</ion-text>
    </ion-item>
  </ion-list>
</template>

<script>
import { defineComponent, toRefs } from "vue";
import {
  IonList,
  IonItem,
  IonButton,
  IonText,
  IonLabel,
  // modalController,
} from "@ionic/vue";
// import ModalTafsir from "@/components/TafsirDetail.vue";

export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonButton,
    IonText,
    IonLabel,
  },
  // props: {
  //   detailSurah: { type: Array, require: true },
  // },
  // setup(props) {
  //   const tafsir = async (item) => {
  //     const modal = await modalController.create({
  //       component: ModalTafsir,
  //       componentProps: {
  //         title: item.number.inSurah,
  //         tafsir: item.tafsir.id.long,
  //       },
  //     });
  //     return modal.present();
  //   };

  //   return {
  //     ...toRefs(props),
  //     tafsir,
  //   };
})
</script>
