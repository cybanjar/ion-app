<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list class="ion-margin-bottom">
        <div class="ion-padding">
          <ion-label color="primary">General</ion-label>
        </div>
        <ion-item>
          <ion-label>Audio<br> 
            <span class="text-caption">View audio control</span>
          </ion-label>
          <ion-toggle v-model="setting.audio"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Translation <br>
            <span class="text-caption">Show translation</span>
          </ion-label>
          <ion-toggle v-model="setting.translation"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-button 
        router-link="/about"
        expand="block" 
        fill="clear"
      >
        About apps
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonFooter,
  IonButton,
} from "@ionic/vue"
import { useSettingStore } from '@/store/setting'

export default defineComponent ({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonFooter,
    IonButton,
  },

  setup() {
  
    return { 
      setting: useSettingStore(),
    }
  }
})
</script>
