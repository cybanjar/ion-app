<template>
  <ion-list
    class="ion-margin-bottom"
    v-for="item in detailSurah.verses"
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
</template>

<script>
import { defineComponent, toRefs } from "vue";
import {
  IonList,
  IonItem,
  IonButton,
  IonText,
  modalController,
} from "@ionic/vue";
import ModalTafsir from "@/components/TafsirDetail.vue";

export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonButton,
    IonText,
  },
  props: {
    detailSurah: { type: Array, require: true },
  },
  setup(props) {
    const tafsir = async (item) => {
      const modal = await modalController.create({
        component: ModalTafsir,
        componentProps: {
          title: item.number.inSurah,
          tafsir: item.tafsir.id.long,
        },
      });
      return modal.present();
    };

    return {
      ...toRefs(props),
      tafsir,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Scheherazade+New&display=swap");

.text-arab {
  font-size: 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, "Scheherazade New", "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>