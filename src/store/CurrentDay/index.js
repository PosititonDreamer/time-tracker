import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "axios";

export const CurrentDay = defineStore('CurrentDay', () => {
    const current = ref(null)
    const records = ref(null)

    const getCurrent = computed(() => current)
    const getRecords = computed(() => records)

    const createDay = async () => {
        try {
            await axios.post('/days/create')
            await findCurrentDay()
        } catch (e) {
            console.log(e)
        }
    }

    const findCurrentDay = async () => {
        try {
            const day = await axios.get('/days/current')
                .then (res => res.data)
            current.value = day.data
        } catch (e) {
            console.log(e)
        }
    }

    const findRecords = async () => {
        try {
            const record = await axios.get(`/records/${current.value.id}`)
                .then (res => res.data)
            records.value = record.data
        } catch (e) {
            console.log(e)
        }
    }

    const createRecord = async (data) => {
        try {
            await axios.post('/records/create', {...data, day_id: current.value.id})
            await findRecords()
            return true
        } catch (e) {
            alert(e.message)
            return false
        }
    }

    const updateRecord = async (data) => {
        try {
            await axios.put('/records/update', data)
            await findRecords()
            return true
        } catch (e) {
            alert(e.message)
            return false
        }
    }

    return {
        getCurrent, getRecords, findCurrentDay, createDay, findRecords, createRecord, updateRecord
    }
})