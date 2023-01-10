import { createRouter, createWebHashHistory } from 'vue-router'
import PostsPage from "@/views/PostsPage.vue"
import MapPage from "@/views/MapPage.vue"

const routes = [
  {
    path: '/',
    name: 'posts',
    component: PostsPage
  },
  {
    path: '/map',
    name: 'map',
    component: MapPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
