import {createApp} from 'vue'
import {createPinia} from "pinia";

import './assets/styles/index.scss'
import App from './App.vue'
import router from './router/index.js'
import axios from "axios";
import {Auth} from "./store/Auth/index.js";

axios.defaults.baseURL = 'https://time-tracker-api-5sou.onrender.com/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'


const startApp = async () => {
    const app = createApp(App)
        .use(createPinia())
        .use(router)
    const {checkAuth} = Auth()
    await checkAuth()

    app.mount('#app')


}

startApp()


