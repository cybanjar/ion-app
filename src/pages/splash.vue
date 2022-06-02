<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div class="ion-text-center">
          <ion-icon class="icon-book" :icon="book"></ion-icon>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonIcon } from "@ionic/vue";
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { book } from "ionicons/icons";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonIcon,
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      setTimeout(() => {
        router.replace("/home");
      }, 2000);
    });
    return {
      book,
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

.icon-book {
  font-size: 5rem;
}
</style>
