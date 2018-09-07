<template>
  <div>
    <input type="range" v-model="variables.cloudTypes">
    <hr>
    <pre>
      {{variables}}
    </pre>
    <hr>
    <p>sunset grade:</p>
    <pre>{{sunsetGrade}}</pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      variables: {
        cloudTypes: null,
        cloudCoverage: null,
        airQuality: null,
        humidity: null,
        windspeed: null,
        visibility: null
      }
    }
  },
  computed: {
    sunsetGrade () {
      if (this.variables.cloudTypes) {
        return parseInt(this.variables.cloudTypes) > 50
      }

      return false
    }
  }
}
</script>
