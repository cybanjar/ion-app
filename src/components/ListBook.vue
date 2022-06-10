<template>
  <ion-card 
    @click="router.push({ path: `/book/${item.id}` })"
    v-for="item in data" 
    :key="item">
    <ion-item>
      <ion-label>{{ item.name }}</ion-label>
    </ion-item>

    <ion-card-content> 
      {{ item.available }} Hadist
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonItem,
  IonLabel,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  components: {
    IonCard,
    IonItem,
    IonLabel,
    IonCardContent,
  },
  props: {
    dataHadist: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      data: []
    })

    const router = useRouter()
    const route = useRoute()

    watchEffect(() => (state.data = props.dataHadist))

    return {
      ...toRefs(state),
      router,
      route,
    }
  }
})
</script>

<style>
.icon-book {
  font-size: 6.25rem;
}
</style>
