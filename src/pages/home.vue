<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
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
          >Hadist</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
  setup() {
    return {
      router: useRouter(),
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
</style>
