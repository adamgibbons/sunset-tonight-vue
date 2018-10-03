<template>
  <div class="error" v-if="$store.getters.error">
    {{$store.getters.error}}
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ErrorMessage'
}
</script>

<style scoped lang="scss">
  .error {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: red;
    padding: 1em;
  }
</style>
