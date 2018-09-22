<template>
  <div class="home">
    <!-- <img alt="DebugTonight logo" src="../assets/logo.png"> -->
    <h1>Sunset Tonight</h1>
    <div v-show="viewState === 'PRISTINE'">
      <p>Is tonight's sunset worth watching?</p>
      <button @click="init()">
        Find out
      </button>
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
import gradeSunset from '@/utils/grade-sunset'

function handleError ({ code }) {
  console.log({ error: code })
}

export default {
  name: 'home',
  components: {
    Grade
  },
  computed: {
    ...mapGetters(['coordinates', 'sunset', 'forecast', 'microForecast', 'viewState']),
    sunsetGrade () {
      if (!this.microForecast) return null

      return gradeSunset(this.microForecast)
    }
  },
  methods: {
    ...mapActions(['setCoordinates']),
    init () {
      if (navigator.geolocation) {
        this.$store.dispatch('setViewState', { viewState: 'LOADING' })
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          this.setCoordinates({ latitude, longitude })
        }, handleError)
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    }
  }
}
</script>
