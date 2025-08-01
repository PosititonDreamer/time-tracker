<script>
  export default {
    name: "App",
    setup() {
      return {

      }
    }
  }
</script>

<template>
  <div class="app__links">
    <router-link class="app__item" active-class="app__item--active" to="/categories">Категории</router-link>
    <router-link class="app__item" active-class="app__item--active" to="/current-day">Текущий день</router-link>
    <router-link class="app__item" active-class="app__item--active" to="/history">История</router-link>
  </div>
  <router-view />
</template>

<style lang="scss" scoped>
  .app {
    &__links {
      display: flex;
      grid-gap: 10px;
      padding: 10px;
      background: rgba(0,0,255, 0.1);
    }

    &__item {
      color: var(--black);
      text-decoration: none;
      transition: opacity .3s ease-in-out;

      &:hover, &--active {
        opacity: 0.6;
      }

      &--active {
        pointer-events: none;
      }
    }
  }
</style>