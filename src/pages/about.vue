<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding-vertical ion-padding">
      <ion-title class="ion-text-center">Assalamu'alaikum warohmatullohiwabarokaatuh</ion-title>
      <p class="ion-text-justify">Terimakasih sudah mendownload apps al-qur'an dan hadist. appsnya free untuk menggunakannya wajib ada koneksi internet dan semoga kedepannya lebih bisa dikembangkan lagi untuk syiar islam</p>
      <p>Sorce data : 
        <ol class="s">
          <a href="https://quran-api-cybanjar.vercel.app/surah" target="_blank" rel="noopener noreferrer"><li>Al-Qur'an</li></a>
          <a href="https://hadith-api-cybanjar.vercel/books" target="_blank" rel="noopener noreferrer"><li>Hadist</li></a>
        </ol>
      </p>

      <ion-label class="ion-padding-vertical">
        Contact Developer :
      </ion-label>
      <ol class="s">
        <li>Email: <a href="mailto:cybanjar@gmail.com">cybanjar@gmail.com</a></li>
        <li>Telegram: <a href="#">@syamsul_id</a></li>
      </ol>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
  },
});
</script>

<style scoped>
ol.s {list-style-type: inherit;}
</style>