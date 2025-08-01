<script>
import {reactive, ref} from "vue";
import {Categories} from "../../store/Categories/index.js";

  export default {
    name: "CategoriesPage",
    beforeCreate() {
      const {listCategory} = Categories()
      listCategory()
    },
    setup() {
      const {getCategories, createCategory, updateCategory, deleteCategory} = Categories()

      const category = ref({
        title: "",
        color: "#000000"
      })

      const categoryUpdate = ref(null)

      const submitCreate = () => {
        if(category.value.title.trim().length){
          const create = createCategory({
            title: category.value.title,
            color: category.value.color,
          })

          if(create) {
            category.value = {
              color: '#000000',
              title: ''
            }
          }
        }
      }

      const submitUpdate = () => {
        if(categoryUpdate.value.title.trim().length){
          const update = updateCategory({
            title: categoryUpdate.value.title,
            color: categoryUpdate.value.color,
            id: categoryUpdate.value.id,
          })

          if(update) {
            categoryUpdate.value = null
          }
        }
      }

      const submitDelete = (id) => {
        if(confirm("Удалить категорию?")) {
          deleteCategory(id)
        }
      }

      return {
        submitCreate, submitUpdate, submitDelete, category, categoryUpdate, getCategories
      }
    }
}
</script>

<template>
  <div class="categories">
    <form class="categories__form" @submit.prevent="submitCreate">
      <input class="categories__input" type="text" placeholder="Заголовок" v-model="category.title">
      <input class="categories__input" type="color" placeholder="color" v-model="category.color" >
      <button class="categories__button categories__button--create" type="submit">Создать категорию</button>
    </form>
    <h2 class="categories__title">{{getCategories.length ? "Список категорий" : "Список категорий пуст"}}</h2>
    <div class="categories__list" v-if="getCategories.length">
      <template v-for="category in getCategories" :key="`category_${category.id}`">
        <form
            v-if="categoryUpdate && category.id === categoryUpdate.id"
            class="categories__item categories__item--update"
            @submit.prevent="submitUpdate"
        >
          <input class="categories__input" type="text" placeholder="title" v-model="categoryUpdate.title">
          <input class="categories__input" type="color" placeholder="color" v-model="categoryUpdate.color" >
          <button class="categories__button categories__button--update" type="submit">Обновить категорию</button>
        </form>
        <div v-else class="categories__item">
          <p class="categories__name">{{category.title}}</p>
          <span class="categories__color" :style='`--primary: ${category.color}`'></span>
          <div class="categories__actions">
            <button class="categories__button categories__button--update" @click="categoryUpdate = category">Редактировать</button>
            <button class="categories__button categories__button--delete" @click="submitDelete(category.id)">Удалить</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<style lang="scss" src="./Categories.scss" scoped />