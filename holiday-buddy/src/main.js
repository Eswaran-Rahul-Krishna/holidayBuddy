import { createApp } from 'vue'
import App from './App.vue'

import './main.css'

import { createRouter, createWebHistory } from 'vue-router'
import Chat from './components/chatApp.vue'
import TravelGuide from './components/travel-guide/travel-guide.vue'
import SignIn from './components/signIn/sign-in.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SignIn },
    { path: '/chat', component: Chat },
    { path: '/travel-guide', component: TravelGuide }
  ]
})

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)

app.mount('#app')
