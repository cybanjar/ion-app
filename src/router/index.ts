import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import home from '@/pages/home.vue'
import surah from '@/pages/surah.vue'
import splash from '@/pages/splash.vue'
import book from '@/pages/book.vue'
import number from '@/pages/surah/number.vue'
import id from '@/pages/book/id.vue'
import juz from '@/pages/juz.vue'
import juzId from '@/pages/juz/detailJuz.vue'
import about from '@/pages/about.vue'

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
  {
    path: '/book/:id',
    name: 'HadistId',
    component: id
  },
  {
    path: '/juz',
    name: 'Juz',
    component: juz
  },
  {
    path: '/juz/:id',
    name: 'JuzId',
    component: juzId
  },
  {
    path: '/about',
    name: 'About',
    component: about
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
