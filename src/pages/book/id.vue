<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label position="fixed">Start : </ion-label>
        <ion-input type="number" v-model="start" placeholder="Start"></ion-input>
        
        <ion-label position="fixed">End : </ion-label>
        <ion-input type="number" v-model="end" placeholder="End"></ion-input>
        <ion-button @click="getHadist">
          <ion-icon :icon="search"></ion-icon>
        </ion-button>
      </ion-item>

      <loading v-if="isLoading" />
      <ion-list
        v-else
        class="ion-margin-bottom"
        v-for="item in data"
        :key="item.id"
      >
        <ion-item>
          <ion-button slot="start">{{ item.number }}</ion-button>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-wrap ion-text-right text-arab"
            >{{ item.arab }}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-text>{{ item.id }}</ion-text>
        </ion-item>
      </ion-list>
    </ion-content>

  </ion-page>
</template>

<script>
import { useRoute } from 'vue-router'
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
  IonButton,
  IonLabel,
  IonText,
  IonInput,
} from '@ionic/vue'
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from 'vue'
import axios from 'axios'
import { search } from 'ionicons/icons'

export default {
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
    IonButton,
    IonLabel,
    IonText,
    IonInput,
  },

  setup() {
    const route = useRoute()

    const state = reactive({
      start: 1,
      end  : 10,
      data : [],
      title: '',
      isLoading: false
    })

    onMounted(() => {
      getHadist()
    })

    async function getHadist () {
      try {
        state.isLoading = true

        const res  = await axios.get(`https://api.hadith.sutanlab.id/books/${route.params.id}?range=${state.start}-${state.end}`)
        state.data = res.data.data.hadiths
        state.title = res.data.data.name

        state.isLoading = false
      } catch (err) {
        console.error(err)
      }
    }

    return {
      ...toRefs(state),
      route,
      state,
      search,
      getHadist,
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Scheherazade+New&display=swap");

.text-arab {
  font-size: 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, "Scheherazade New", "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>