<script>
  import {History} from "../../store/History/index.js";
  import {Categories} from "../../store/Categories/index.js";

  export default {
    async beforeCreate() {
      const {listYears} = History()
      const { listCategory } = Categories()

      await listYears()
      await listCategory()
    },
    setup() {
      const {getHistory} = History()

      return {
        getHistory
      }
    }
  }
</script>

<template>
  <div class="history">
    <div class="history__list">
      <Accordion v-for="year in getHistory" :data="year" :key="`year-${year}`" :open="getHistory.length === 1"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>