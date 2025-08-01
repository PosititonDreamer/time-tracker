import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "axios";

export const Categories = defineStore('Categories', () => {
    const categories = ref([]);

    const getCategories = computed(() => categories)

    const createCategory = async (data) => {
        try {
            await axios.post(`/categories/create`, data);
            await listCategory()
            return true
        } catch (e) {
            alert(e.message)
            return false
        }

    }

    const updateCategory = async (data) => {
        try {
            await axios.put(`/categories/update`, data);
            await listCategory()
            return true
        } catch (e) {
            alert(e.message)
            return false
        }
    }

    const deleteCategory = async (data) => {
        try {
            await axios.delete(`/categories/delete/${data}`);
            await listCategory()
        } catch (e) {
            alert(e.message)
        }
    }

    const listCategory = async () => {
        try {
            const list = await axios.get('/categories/')
                .then(res => res.data)
            categories.value = list.data
        } catch (e) {
            console.log(e)
        }
    }

    return {
        listCategory, getCategories, createCategory, updateCategory, deleteCategory
    }
})