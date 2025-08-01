<script>
  import {ref} from "vue";
  import {History} from "../../store/History/index.js";
  import {Categories} from "../../store/Categories/index.js";

  export default {
    name: "Accordion",
    props: {
      data: {
        type: Object,
        required: true
      },
      open: {
        type: Boolean,
        default: false
      }
    },
    setup({data, open}) {
      const opened = ref(false)

      const {listMonths, listDays, listRecords} = History()
      const {getCategories} = Categories()

      const openAccordion = () => {
        if(opened.value) {
          opened.value = false;
          return
        }
        opened.value = true;
        if(!data.childrens.length) {
          if(data.type === 'year') {
            listMonths({year: data.year})
          }

          if(data.type === 'month') {
            listDays({year: data.year, month: data.month})
          }

          if(data.type === 'day') {
            listRecords({
              year: data.year,
              month: data.month,
              id: data.id,
            })
          }
        }
      }

      if(open) {
        openAccordion()
      }

      const copyRecords = (getRecords) => {
        let finalText = ''

        getRecords.forEach((record) => {
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
        openAccordion, opened, getCategories, copyRecords
      }
    }
  }
</script>

<template>
  <div class="accordion">
    <div class="accordion__header" @click.stop="openAccordion">
      <div class="accordion__title">{{data.title}}</div>
      <div :class="['accordion__symbol', {'accordion__symbol--open': opened}]">
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="accordion__content" v-if="opened">
      <template v-if="data.type !== 'day' && data.childrens?.length">
        <Accordion v-for="children in data.childrens" :key="`${data.title}-${children.type}-${children.id ? children.id : Date.now()}`" :data="children" :open="data.childrens.length === 1" />
      </template>
      <template v-else-if="data.type === 'day'" >
        <div class="record__list">
          <div class="record__item" v-for="record in data.childrens" :key="`record-${record.id}`">
            <span>
              {{record.time_start}}{{record.time_end ? ' - ' + record.time_end : ''}} — {{record.title}}
              <template v-if="record.category_id">
                ({{ getCategories.find(category => category.id === record.category_id)?.title}})
              </template>
            </span>
          </div>
        </div>
        <button class="record__copy" @click="copyRecords(data.childrens)">Скопировать информацию</button>
      </template>
      <p v-else>Тут нет записей</p>
    </div>
  </div>
</template>

<style lang="scss" src="./Accordion.scss" scoped />
