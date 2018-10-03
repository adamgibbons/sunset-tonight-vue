<template>
  <div class="home">
    <!-- <img alt="" src="../assets/logo.png"> -->
    <ErrorMessage />
    <h1>Sunset Tonight</h1>
    <div v-show="viewState === VIEW_STATES.PRISTINE">
      <p>Is tonight's sunset worth watching?</p>
      <button @click="init()">Find out</button>
    </div>
    <div v-show="viewState === VIEW_STATES.LOADING">
      <p>Grading tonight's sunset.<br>Hang on...</p>
    </div>
    <div v-show="viewState === VIEW_STATES.LOADED">
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
import ErrorMessage from '@/components/ErrorMessage.vue'
import { gradeSunset } from '@/utils'
import { VIEW_STATES } from '@/store/constants'

export default {
  name: 'Root',
  components: { ErrorMessage },
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
  data () {
    return {
      VIEW_STATES
    }
  },
  methods: {
    ...mapActions(['setCoordinates', 'createError', 'setViewState']),
    init () {
      if (navigator.geolocation) {
        this.setViewState({ viewState: VIEW_STATES.LOADING })

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
