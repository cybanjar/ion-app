<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div class="ion-text-center">
          <ion-icon class="icon-book" :icon="book"></ion-icon>
        </div>
        <p class="ion-margin">
          "Aku telah tinggalkan pada kalian dua perkara. <br />
          Kalian tidak akan tersesat selama berpegang kepada keduanya, (yaitu)
          Kitab Allah dan Sunnah Rasulnya". <br />
          (HR. Malik, Baihaqy)
        </p>
        <ion-button
          class="ion-padding"
          color="primary"
          shape="round"
          fill="outline"
          expand="full"
          @click="() => router.push('/surah')"
          >Al-Qur'an</ion-button
        >
        <ion-button
          class="ion-padding"
          color="primary"
          shape="round"
          fill="outline"
          expand="full"
          router-link="/book"
          >Hadist</ion-button
        >
        <!-- <ion-button
          class="ion-padding"
          color="primary"
          shape="round"
          fill="outline"
          expand="full"
          router-link="/time-sholat"
          >Jadwal Sholat</ion-button
        > -->
        <ion-button
          class="ion-padding"
          color="primary"
          shape="round"
          fill="outline"
          expand="full"
          router-link="/setting"
          >Setting</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
  useBackButton,
  useIonRouter,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Plugins } from "@capacitor/core";
import { book } from "ionicons/icons";

const { App } = Plugins;

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
  setup() {
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });

    return {
      router: useRouter(),
      book
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container p {
  font-size: 12px;
  line-height: 22px;
  color: #8c8c8c;
}

.icon-book {
  font-size: 5rem;
}
</style>
