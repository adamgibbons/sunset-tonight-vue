<template>
  <div class="home">
    <div>sunset grade: {{sunsetGrade}}</div>
    <hr>
    <button @click="init">Get my sunset</button>
    <p>
      1. Determine your coordinates:
      <pre>{{coordinates}}</pre>
    </p>
    <p>
      2. Determine time of tonight's sunset:
      <pre>{{sunset || '-'}}</pre>
    </p>
    <p>
      3. Get forecast at sunset
      <pre>{{microForecast || '-'}}</pre>
    </p>

    <p>Powered by Dark Sky</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import gradeSunset from '@/utils/grade-sunset'

function handleError ({ code }) {
  console.log({ error: code })
}

export default {
  name: 'Sunset',
  computed: {
    ...mapGetters(['coordinates', 'sunset', 'forecast']),
    microForecast () {
      if (!this.forecast) return null

      const hourlyForecasts = this.forecast.hourly.data.map(({ time }) => {
        return Math.abs(time - this.sunset)
      })

      const forecastClosestToSunsetIdx = hourlyForecasts.indexOf(Math.min(...hourlyForecasts))

      return this.forecast.hourly.data[forecastClosestToSunsetIdx]
    },
    sunsetGrade () {
      if (!this.microForecast) return null

      return gradeSunset(this.microForecast)
    }
  },
  methods: {
    ...mapActions(['setCoordinates']),
    init () {
      if (navigator.geolocation) {
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

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p, pre {
  text-align: left;
}

pre {
  margin-left: 5em;
}
</style>
