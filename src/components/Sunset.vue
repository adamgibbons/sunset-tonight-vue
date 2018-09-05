<template>
  <div>
    <p>
      1. Determine your coordinates:
      <pre>{{coordinates}}</pre>
    </p>
    <p>
      2. Determine time of tonight's sunset:
      <pre>{{sunset || 'calculating...'}}</pre>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

function handleError ({ code }) {
  console.log({ error: code })
}

export default {
  name: 'Sunset',
  computed: mapGetters(['coordinates', 'sunset']),
  methods: mapActions(['setCoordinates']),
  mounted () {
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
