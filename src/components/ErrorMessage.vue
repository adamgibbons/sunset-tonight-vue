<template>
  <div class="error" v-if="error">
    <div class="destroy-icon" @click="destroyError">x</div>
    {{error}}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ErrorMessage',
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    ...mapActions(['destroyError'])
  }
}
</script>

<style scoped lang="scss">
  .error {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: red;
    padding: 2em 1.5em 1em;
  }
  .destroy-icon {
    font-size: 2rem;
    position: fixed;
    font-weight: 100;
    top: .66rem;
    right: 1rem;
    padding: .66em;
  }
</style>
