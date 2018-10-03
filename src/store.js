import Vue from 'vue'
import Vuex from 'vuex'
import http from 'axios'
import calculateTimeOfSunset from '@/utils/solar-calc'
import utcToUnixTimestamp from '@/utils/utc-to-unix-timestamp'

const VIEW_STATES = {
  PRISTINE: 'PRISTINE',
  LOADING: 'LOADING',
  LOADED: 'LOADED'
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude: null,
    longitude: null,
    sunset: null,
    forecast: null,
    error: null,
    viewState: VIEW_STATES.PRISTINE
  },
  getters: {
    error: state => state.error,
    coordinates: state => {
      return { latitude: state.latitude, longitude: state.longitude }
    },
    viewState: state => state.viewState,
    sunset: state => utcToUnixTimestamp(state.sunset),
    forecast: state => state.forecast,
    microForecast: state => {
      if (!state.forecast) return null

      const hourlyForecasts = state.forecast.hourly.data.map(({ time }) => {
        return Math.abs(time - state.sunset)
      })

      const forecastClosestToSunsetIdx = hourlyForecasts.indexOf(Math.min(...hourlyForecasts))

      return state.forecast.hourly.data[forecastClosestToSunsetIdx]
    }
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
    setViewState (state, { viewState }) {
      state.viewState = viewState
    },
    createError (state, { message }) {
      state.error = message
    },
    destroyError (state) {
      state.error = null
    }
  },
  actions: {
    destroyError ({ commit }) {
      commit('destroyError')
    },
    createError ({ commit }, { message }) {
      commit('createError', { message })
    },
    setViewState ({ commit }, { viewState }) {
      commit('setViewState', { viewState })
    },
    setCoordinates ({ commit, dispatch }, { latitude, longitude }) {
      commit('setCoordinates', { latitude, longitude })
      commit('setSunset', { latitude, longitude })
      dispatch('getForecast')
    },
    getForecast ({ commit, getters, state }) {
      // TODO move key to env var
      const apiKey = '590014b33dd991435f9576af4c1d81c0'
      const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast'

      // Well, this is a hack...
      const url = `${baseUrl}/${apiKey}/${state.latitude},${state.longitude},${getters.sunset}`

      http.get(url)
        .then(({ data }) => {
          commit('setForecast', { forecast: data })
          commit('setViewState', { viewState: VIEW_STATES.LOADED })
        })
        .catch(error => console.log(error))
    }
  }
})
