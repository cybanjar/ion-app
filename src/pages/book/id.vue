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
        <ion-button @click="load">
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
import { search } from 'ionicons/icons'
import { getBookId } from '@/api/hadits'

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
      load()
    })

    async function load () {
      state.isLoading = true
      
      const params = { range: `${state.start}-${state.end}`}
      try {
        const response = await getBookId(route.params.id, params)
        state.data = response.data.hadiths
        state.title = response.data.name
      } catch (error) {
        console.error(error)
      } finally {
        state.isLoading = false
      }
    }

    return {
      ...toRefs(state),
      route,
      state,
      search,
      load,
    }
  }
}
</script>
