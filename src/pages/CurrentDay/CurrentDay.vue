<script>
import {CurrentDay} from "../../store/CurrentDay/index.js";
import {Categories} from "../../store/Categories/index.js";
import {ref} from "vue";

export default {
  name: "CurrentDay",
  async beforeCreate() {
    const {findCurrentDay, findRecords } = CurrentDay()
    const { listCategory } = Categories()

    await findCurrentDay()
    await findRecords()
    await listCategory()
  },
  setup() {
    const {getCurrent, createDay, getRecords, createRecord, updateRecord} = CurrentDay()
    const {getCategories} = Categories()
    const currentDate = new Date().toLocaleString('ru-RU', {timeZone: 'Asia/Yekaterinburg'}).split(', ')[0]

    const record = ref({
      category_id: null,
      title: '',
    })

    const recordUpdate = ref(null)

    const submitCreateRecord = () => {
      if(record.value.title.trim().length ){
        const create  = createRecord({
          category_id: record.value.category_id,
          title: record.value.title,
        })
        if(create) {
          record.value = {
            category_id: null,
            title: '',
          }
        }
      }
    }

    const submitRecordUpdate = () => {
      if(recordUpdate.value.title.trim().length ){
        const update  = updateRecord({
          category_id: recordUpdate.value.category_id,
          title: recordUpdate.value.title,
          id: recordUpdate.value.id,
        })
        if(update) {
          recordUpdate.value = null
        }
      }
    }

    const copyRecords = () => {
      let finalText = ''

      getRecords.value.forEach((record) => {
        finalText += `${record.time_start}`
        finalText += `${record.time_end ? ' - ' + record.time_end : ''}`
        finalText += ` — ${record.title}`
        if(record.category_id) {
          const findCategory = getCategories.value.find((category) => category.id === record.category_id)
          if(findCategory) {
            finalText += `(${findCategory.title})`
          }
        }
        finalText += '\n'
      })

      navigator.clipboard.writeText(finalText)
      alert('Скопировано')
    }

    return {
      getCurrent, currentDate, createDay, getRecords, getCategories, submitCreateRecord, record, copyRecords, recordUpdate, submitRecordUpdate
    }
  }
}
</script>

<template>
  <div class="current-day" v-if="getCurrent">
    <p class="current-day__title">Сегодня: <span>{{getCurrent.day}}</span></p>
    <form class="current-day__create"
          v-if="currentDate !== getCurrent.day"
          @submit.prevent="createDay"
    >
      <p class="current-day__text">Наступил новый день</p>
      <button class="current-day__button" type="submit">Начать новый день</button>
    </form>
    <form class="current-day__record-form" @submit.prevent="submitCreateRecord">
      <input class="current-day__input" type="text" placeholder="Название" v-model="record.title">
      <select class="current-day__input" v-model="record.category_id">
        <option :value="null">Категория</option>
        <option v-for="category in getCategories" :key="`option-category-${category.id}`" :value="category.id">{{category.title}}</option>
      </select>
      <button class="current-day__button">Создать запись</button>
    </form>
    <div class="current-day__list">
      <template v-for="record in getRecords" :key="`record_${record.day}`">
        <form class="current-day__item current-day__item--update" @submit.prevent="submitRecordUpdate" v-if="recordUpdate && recordUpdate.id === record.id">
          <span>{{record.time_start}}{{record.time_end ? ' - ' + record.time_end : ''}}</span>
          <input class="current-day__input" type="text" placeholder="Название" v-model="recordUpdate.title">
          <select class="current-day__input" v-model="recordUpdate.category_id">
            <option :value="null">Категория</option>
            <option v-for="category in getCategories" :key="`option-category-${category.id}`" :value="category.id">{{category.title}}</option>
          </select>
          <button class="current-day__button">Изменить запись</button>
        </form>
        <div class="current-day__item" v-else @dblclick="recordUpdate = record">
          <span>
            {{record.time_start}}{{record.time_end ? ' - ' + record.time_end : ''}} — {{record.title}}
            <template v-if="record.category_id">
              ({{ getCategories.find(category => category.id === record.category_id)?.title}})
            </template>
          </span>
        </div>
      </template>
    </div>
    <button class="current-day__copy" @click="copyRecords">Скопировать данные</button>
  </div>
</template>

<style lang="scss" src="./CurrentDay.scss" scoped />