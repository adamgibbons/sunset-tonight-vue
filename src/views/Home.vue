<template>
  <div class="home">
    <!-- <img alt="SunsetTonight logo" src="../assets/logo.png"> -->
    <Sunset msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Sunset from '@/components/Sunset.vue'

export default {
  name: 'home',
  components: {
    Sunset
  }
}
</script>
