<template>
  <div class="wrapper">
    <h3>Sunset Algorithm Control Panel</h3>
    <section>
      <div class="panel metal linear">
        <label>Windspeed</label>
        <input type="range" v-model="variables.windspeed" min=0 max=100>
        <div class="output">{{variables.windspeed}} knots</div>
      </div>
      <div class="panel metal linear">
        <label>Humidity</label>
        <input type="range" v-model="variables.humidity" min=0 max=100>
        <div class="output">{{variables.humidity}}%</div>
      </div>
      <div class="panel metal linear">
        <label>Cloud coverage</label>
        <input type="range" v-model="variables.cloudCoverage" min=0 max=100>
        <div class="output">{{variables.cloudCoverage}}%</div>
      </div>
      <div class="panel metal linear">
        <label>Cloud types</label>
        <select v-model="variables.cloudTypes" multiple>
          <option selected disabled>Select clouds...</option>
          <option v-for="cloud in CLOUD_TYPES" :key="cloud">{{cloud}}</option>
        </select>
      </div>
    </section>

    <section>
      <pre>// VARIABLES<br><br>{{variables}}</pre>
      <pre>// SUNSET GRADE<br><br>{{sunsetGrade}}</pre>
    </section>
  </div>
</template>

<script>
import { gradeSunset } from '@/utils'

const [STRATUS, CUMULUS, CIRRUS] = ['STRATUS', 'CUMULUS', 'CIRRUS']
const CLOUD_TYPES = [STRATUS, CUMULUS, CIRRUS]

export default {
  data () {
    return {
      CLOUD_TYPES,
      variables: {
        cloudTypes: [STRATUS, CUMULUS, CIRRUS],
        cloudCoverage: 50,
        humidity: 60,
        windspeed: 5
      }
    }
  },
  methods: {
    toggleActiveState (cloud, index) {
      if (this.variables.cloudTypes.indexOf(cloud !== -1)) {
        this.variables.cloudTypes.splice(index, 1)
        return
      }

      this.variables.cloudTypes.push(cloud)
    }
  },
  computed: {
    sunsetGrade () {
      return gradeSunset(this.variables)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    pre {
      text-align: left;
    }

    .panel {
      display: inline-block;
      vertical-align: top;
      min-height: 100px;
      margin: .33rem;

      label {
        display: block;
        margin-bottom: 1em;
      }
    }
  }

  section {
    margin: 1em 0 2em;

    pre {
      display: inline-block;
      min-height: 200px;
      vertical-align: top;
    }
  }

  pre {
    background-color: #444;
    color: white;
    padding: 2em;
    margin: .33rem;
    border-radius: 5px;
    min-width: 33%;
  }
  .panel {
    padding: 2em;
    border: 1px solid;
  }

  a { text-decoration: none; display: block; }
  .metal {
    position: relative;
    // margin: 40px auto;
    outline: none;
    // font: bold 6em/2em "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
    text-align: center;
    color: hsla(0,0%,20%,1);
    text-shadow: hsla(0,0%,40%,.5) 0 -1px 0, hsla(0,0%,100%,.6) 0 2px 1px;
    background-color: hsl(0,0%,90%);
    transition: color .2s;
  }

  .metal.linear {
    border-radius: .5em;
    background-image: -webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%, .1) 7.5%),
      -webkit-repeating-linear-gradient(left, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   4%, hsla(0,0%,  0%,.03) 4.5%),
      -webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.15) 2.2%),
      linear-gradient(180deg, hsl(0,0%,78%)  0%,
      hsl(0,0%,90%) 47%,
      hsl(0,0%,78%) 53%,
      hsl(0,0%,70%)100%);
  }
</style>
