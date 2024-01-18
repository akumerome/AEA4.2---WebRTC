import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAppStore } from './stores/app';

const app = createApp(App)

app.use(createPinia())
app.use(router)

const store = useAppStore();

app.mount('#app')

//igual que los sockets o los fetch los ponemos fuera en los community manager y lo ponemos fuera en una variable global y eso no te lo recarga nadie