import Vue from 'vue'
import Vuex from 'vuex'
import calculateTimeOfSunset from '@/utils/solar-calc'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude: null,
    longitude: null,
    sunset: null
  },
  getters: {
    coordinates: state => {
      return { latitude: state.latitude, longitude: state.longitude }
    },
    sunset: state => state.sunset
  },
  mutations: {
    setCoordinates (state, { latitude, longitude }) {
      state.latitude = latitude
      state.longitude = longitude
    },
    setSunset (state, { latitude, longitude }) {
      state.sunset = calculateTimeOfSunset(latitude, longitude)
    }
  },
  actions: {
    setCoordinates ({ commit }, { latitude, longitude }) {
      commit('setCoordinates', { latitude, longitude })
      commit('setSunset', { latitude, longitude })
    }
  }
})
