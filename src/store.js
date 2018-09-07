import Vue from 'vue'
import Vuex from 'vuex'
import http from 'axios'
import calculateTimeOfSunset from '@/utils/solar-calc'
import utcToUnixTimestamp from '@/utils/utc-to-unix-timestamp'
import evaluateSunset from '@/utils/sunset-algorithm'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude: null,
    longitude: null,
    sunset: null,
    forecast: null,
    sunsetResult: null
  },
  getters: {
    coordinates: state => {
      return { latitude: state.latitude, longitude: state.longitude }
    },
    sunset: state => utcToUnixTimestamp(state.sunset),
    forecast: state => state.forecast,
    sunsetResult: state => state.sunsetResult
  },
  mutations: {
    setCoordinates (state, { latitude, longitude }) {
      state.latitude = latitude
      state.longitude = longitude
    },
    setSunset (state, { latitude, longitude }) {
      state.sunset = calculateTimeOfSunset(latitude, longitude)
    },
    setForecast (state, { forecast }) {
      state.forecast = forecast
    },
    setSunsetResult (state, { sunsetResult }) {
      state.sunsetResult = sunsetResult
    }
  },
  actions: {
    setCoordinates ({ commit, dispatch }, { latitude, longitude }) {
      commit('setCoordinates', { latitude, longitude })
      commit('setSunset', { latitude, longitude })
      dispatch('getForecast')
    },
    getForecast ({ commit, dispatch, getters, state }) {
      // TODO move key to env var
      const apiKey = '590014b33dd991435f9576af4c1d81c0'
      const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast'

      // Well, this is a hack...
      const url = `${baseUrl}/${apiKey}/${state.latitude},${state.longitude},${getters.sunset}`

      http.get(url)
        .then(({ data }) => {
          commit('setForecast', { forecast: data })
          dispatch('getSunsetResult', { forecast: data })
        })
        .catch(error => console.log(error))
    },
    getSunsetResult ({ commit }, { forecast }) {
      // may one day be async
      const res = evaluateSunset([{ source: 'Darksky', forecast: forecast }])

      commit('setSunsetResult', { sunsetResult: res })
    }
  }
})
