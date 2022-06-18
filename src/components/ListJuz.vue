<template>
  <ion-card
    @click="detail(item)"
    v-for="item in data" 
    :key="item">
    <ion-item>
      <ion-label>Juz {{ item }}</ion-label>
    </ion-item>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { defineComponent, reactive, toRefs } from "vue"
import _ from 'lodash'
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    IonCard,
    IonItem,
    IonLabel,
  },
  setup() {
    const router = useRouter()

    const state = reactive({
      data: _.range(1, 31)
    })

    function detail(value) {
      router.push({path: `/juz/${value}`})
    }    

    return {
      ...toRefs(state),
      detail,
      router
    }
  }
})
</script>

<style>

</style>
