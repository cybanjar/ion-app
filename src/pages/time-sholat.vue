<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Jadwal Sholat</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-title class="ion-text-center">Pilih lokasi</ion-title>
      <ion-select 
        v-model="city" 
        placeholder="Pilih kota">
        <ion-select-option 
          v-for="(item, index) in allCity" 
          :key="index" 
          :value="item.id">
          {{ item.lokasi }}
        </ion-select-option>
      </ion-select>
      <pre>state: {{ city }}</pre>
      <pre>jadwal {{ jadwal }}</pre>
      <ion-item>
        <ion-label>Subuh</ion-label>
        <ion-label class="ion-text-right">15</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSelect, 
  IonSelectOption,
} from "@ionic/vue";
import { computed, defineComponent, onMounted, reactive, toRefs, watchEffect } from "vue";
import { timeSholat } from '@/api/config'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

export default defineComponent({
  name: "TimeSholatPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSelect, 
    IonSelectOption,
  },
  setup () {

    const state = reactive({
      allCity: [],
      city: null,
      location: {}
    })

    watchEffect(() => {
      if (state.city) {
        loadTimeSholat()
      }
    })

    const jadwal = computed(() => {
      return location.jadwal
    })

    onMounted(() => {
      loadLokasi()
    })

    const loadLokasi = async () => {
      await axios.get(`${timeSholat}/sholat/kota/semua`)
        .then((response) => {
          state.allCity = response.data
        })
    }

    const loadTimeSholat = async () => {
      const now = moment().format("YYYY/MM/DD")
      
      await axios.get(`${timeSholat}/sholat/jadwal/${state.city}/${now}`)
        .then((response) => {
          state.location = _.get(response, 'data.data', {})
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    return {
      ...toRefs(state),
      loadTimeSholat,
      jadwal
    }
  }
});
</script>