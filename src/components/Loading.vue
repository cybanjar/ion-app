<template>
  <ion-page>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-container">
        <img
          class="loading-item"
          src="@/assets/image/Send.svg"
          alt="Icon Loading"
        />
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from "@ionic/vue";
import { defineComponent, computed } from "vue";
import { useSessionStore } from "@/store/session";

export default defineComponent({
  components: { IonPage },
  setup() {
    const store = useSessionStore();

    const loading = computed({
      get: () => store.loading,
      set: (val) => {
        store.loading = val;
      },
    });

    return {
      loading,
    };
  },
});
</script>

<style scoped>
.loading-overlay {
  align-items: center;
  background-color: rgba(22, 22, 22, 0.5);
  bottom: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 9999;
}

.loading-overlay .loading-item {
  animation: overlayLoading 1s ease-in-out infinite;
  width: 5rem;
}

#preloader .loading-overlay {
  background-color: #e42e2c;
}

@keyframes overlayLoading {
  from {
    opacity: 1;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(1);
  }
}
</style>