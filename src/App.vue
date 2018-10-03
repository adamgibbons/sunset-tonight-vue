<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/debug">Debug</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: teal;
  color: white;
  font-size: 24px;
  line-height: 32px;
  padding: 2em auto;
}
button {
  border: none;
  border-radius: 5px;
  background-color: white;
  font-size: 1.1em;
  padding: .5em 1.5em;
  color: teal;
  font-weight: 500;
}
h1 {
  line-height: 1.1em;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 1em;
  margin: 0 auto;
  // max-width: 800px;
}
</style>
