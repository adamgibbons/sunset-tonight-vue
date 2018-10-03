<template>
  <div class="home">
    <!-- <img alt="" src="../assets/logo.png"> -->
    <ErrorMessage />
    <h1>Sunset Tonight</h1>
    <div v-show="viewState === 'PRISTINE'">
      <p>Is tonight's sunset worth watching?</p>
      <button @click="init()">Find out</button>
    </div>
    <div v-show="viewState === 'LOADING'">
      <p>Grading tonight's sunset.<br>Hang on...</p>
    </div>
    <div v-show="viewState === 'LOADED'">
      <p v-if="sunsetGrade">
        Sunset is going to be great &mdash; don't miss it!
      </p>
      <p v-else>
        Don't bother, you're not missing anything tonight.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Grade from '@/components/Grade.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import gradeSunset from '@/utils/grade-sunset'

export default {
  name: 'home',
  components: { Grade, ErrorMessage },
  computed: {
    ...mapGetters([
      'coordinates',
      'sunset',
      'forecast',
      'microForecast',
      'viewState']),
    sunsetGrade () {
      if (!this.microForecast) return null

      return gradeSunset(this.microForecast)
    }
  },
  methods: {
    ...mapActions(['setCoordinates', 'createError']),
    init () {
      if (navigator.geolocation) {
        this.$store.dispatch('setViewState', { viewState: 'LOADING' })

        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          this.setCoordinates({ latitude, longitude })
        }, this.createError)
      } else {
        this.createError({ message: 'Geolocation is not supported by this browser.' })
      }
    }
  }
}
</script>
