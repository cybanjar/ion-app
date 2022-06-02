<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col size="6">
        <div class="ion-text-center">
          <ion-icon class="icon-book" :icon="book"></ion-icon>
        </div>
      </ion-col>
    </ion-row>
    <ion-text class="ion-padding">Surah {{ search.value }}</ion-text>
    <ion-searchbar v-model="search.value"></ion-searchbar>
  </ion-grid>
  <my-component />

  <ion-card v-for="item in filterSurah" :key="item.number">
    <ion-item>
      <ion-button slot="start">{{ item.number }}</ion-button>
      <ion-label>{{ item.name.transliteration.id }}</ion-label>
      <ion-button @click="openModal(item)" fill="outline" slot="end"
        >Tafsir</ion-button
      >
    </ion-item>

    <ion-card-content> {{ item.name.translation.id }} </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonItem,
  IonButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCardContent,
  IonSearchbar,
  modalController,
} from "@ionic/vue";
import {
  defineComponent,
  reactive,
  toRefs,
  watchEffect,
  computed,
  inject,
} from "vue";
import { book } from "ionicons/icons";
import ModalTafsir from "./ModalTafsir";

export default defineComponent({
  components: {
    IonCard,
    IonItem,
    IonButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonCardContent,
    IonSearchbar,
  },
  props: {
    dataSurah: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      data: [],
      search: {
        value: "",
      },
      modal: {
        show: false,
      },
    });

    watchEffect(() => (state.data = props.dataSurah));

    const filterSurah = computed(() => {
      let tempSurahs = state.data;

      if (state.search.value.length > 0) {
        return tempSurahs.filter((item) => {
          return item.name.transliteration.id
            .toUpperCase()
            .includes(state.search.value.toUpperCase());
        });
      }

      return tempSurahs;
    });

    const tafsir = (val) => {
      state.modal.show = val;
    };

    const openModal = async (item) => {
      console.log(item);
      const modal = await modalController.create({
        component: ModalTafsir,
        componentProps: {
          title: item.name.transliteration.id,
          tafsir: item.tafsir.id,
        },
      });
      return modal.present();
    };

    return {
      ...toRefs(state),
      book,
      filterSurah,
      tafsir,
      openModal,
    };
  },
});
</script>

<style scoped>
.icon-book {
  font-size: 6.25rem;
}
</style>
