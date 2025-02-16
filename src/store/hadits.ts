import { defineStore } from 'pinia'
import { getBooks } from '@/api/hadits'

export const useHaditsStore = defineStore('hadits', {
  state: () => {
    return {
      loading: false,
      books: [],
    }
  },

  actions: {
    async loadBooks () {
      if (this.books.length > 0)
        return

      this.loading = true
      try {
        const res = await getBooks()
        this.setBook(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    setBook (value: any) {
      this.books = value
    },
  },
  persist: true
})