import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "axios";

const monthsTitle = {
    "1": 'Январь',
    "2": 'Февраль',
    "3": 'Март',
    "4": 'Апрель',
    "5": 'Май',
    "6": 'Июнь',
    "7": 'Июль',
    "8": 'Август',
    "9": 'Сентябрь',
    "10": 'Октябрь',
    "11": 'Ноябрь',
    "12": 'Декабрь',
}

export const History = defineStore('History', () => {
    const history = ref(null)

    const getHistory = computed(() => history)

    const listYears = async () => {
        try {
            const years = await axios.get('/days/years')
                .then(res => res.data);
            history.value = years.data.map((year) => {
                year.childrens = []
                year.type = 'year'
                year.title = year.year + ' год'
                return year;
            })
        } catch (e) {
            console.log(e)
        }
    }

    const listMonths = async (data) => {
        try {
            const months = await axios.post('/days/months', data)
                .then(res => res.data);
            const foundYear = history.value.find(year => year.year === data.year)
            if(foundYear){
                foundYear.childrens = months.data.map((month) => {
                    month.childrens = []
                    month.type = 'month'
                    month.year = data.year
                    month.title =  monthsTitle[month.month]
                    return month;
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const listDays = async (data) => {
        try {
            const days = await axios.post('/days/list', data)
                .then(res => res.data);
            const foundYear = history.value.find(year => year.year === data.year)
            if(foundYear){
                const fountMonth = foundYear.childrens.find(month => month.month === data.month)
                if(fountMonth){
                    fountMonth.childrens = days.data.map((day) => {
                        day.childrens = []
                        day.type = 'day'
                        day.title =  day.day
                        day.year = data.year
                        day.month = data.month
                        return day;
                    })
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const listRecords = async (data) => {
        try {
            const records = await axios.get(`/records/${data.id}`)
                .then(res => res.data);
            const foundYear = history.value.find(year => year.year === data.year)
            if(foundYear){
                const fountMonth = foundYear.childrens.find(month => month.month === data.month)
                if(fountMonth){
                    const foundDay = fountMonth.childrens.find(day => day.id === data.id)
                    if(foundDay){
                        foundDay.childrens = records.data
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getHistory,
        listYears,
        listMonths,
        listDays,
        listRecords
    }
})