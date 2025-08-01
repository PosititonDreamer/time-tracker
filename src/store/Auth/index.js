import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "axios";

export const Auth = defineStore('Auth', () => {
    const user = ref(null)

    const getUser = computed(() => user.value)

    const checkAuth = async () => {
        try {
            if (localStorage.getItem('token')) {
                const auth = await axios.get('/users/info', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                    }
                })

                user.value = auth.data
                axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
            }
        } catch (e) {
            console.log(e)
            localStorage.removeItem('token');
        }
    }

    const login = async () => {
        const auth = await axios.post('/users/login', {
                login: 'Neadekvat',
                password: 'password'
            }
        )

        localStorage.setItem('token', auth.data.token);
    }

    return {
        getUser, checkAuth, login
    }
})