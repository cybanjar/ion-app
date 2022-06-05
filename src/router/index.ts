import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import home from '@/pages/home.vue'
import surah from '@/pages/surah.vue'
import splash from '@/pages/splash.vue'
import book from '@/pages/book.vue'
import number from '@/pages/surah/number.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Splash',
    component: splash
  },
  {
    path: '/home',
    name: 'Home',
    component: home
  },
  {
    path: '/surah',
    name: 'Surah',
    component: surah
  },
  {
    path: '/surah/:number',
    name: 'SurahNumber',
    component: number
  },
  {
    path: '/book',
    name: 'Book',
    component: book
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
