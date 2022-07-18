import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => {
    return { 
      audio: true,
      translation: true,
      translationEn: false,
    }
  },

  actions: {
    switch() {
      this.audio = !this.audio
    },
  },
})