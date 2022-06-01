<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <strong class="ion-margin-bottom">Read</strong>
        <ion-button
          class="ion-padding"
          color="primary"
          shape="round"
          fill="outline"
          expand="full"
          @click="() => router.push('/surah')"
        >Al-Qur'an</ion-button>
        <ion-button
          class="ion-padding"
          color="primary"
          shape="round"
          fill="outline"
          expand="full"
        >Hadist</ion-button>
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

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
