let darkskyRes = {
  currently: {
    time: 1536275995,
    summary: 'Rain',
    icon: 'rain',
    precipIntensity: 0.0829,
    precipIntensityError: 0.0264,
    precipProbability: 1,
    precipType: 'rain',
    temperature: 77.17,
    apparentTemperature: 78.59,
    dewPoint: 72.35,
    humidity: 0.85,
    pressure: 1019.79,
    windSpeed: 4.27,
    windGust: 8.92,
    windBearing: 30,
    cloudCover: 0.9,
    uvIndex: 0,
    visibility: 6.1,
    ozone: 278.93
  },
}

// all scores are 0-2 to start, with 2 being best
// 0 - No
// 1 - Maybe
// 2 - Yes

// the hope was to cut down on boilerplate... not sure i like the magic strings
const features = [
  // there are problems here... especially if order matters... mvp!
  'cloudHeight',
  'cloudCoverage',
  'airCleanliness',
  'humidity',
  'winds',
  'visibility'
]

const initialEval = features.reduce(function (obj, featName) {
  obj[featName] = 0
  return obj
}, {})

export default function evaluateSunset (forecasts) {
  const fullEval = forecasts.reduce(
    function (evaluation, { source, forecast }) {
      const input = formatInput(source, forecast)

      return accumulateEval(evaluation, input)
    }, initialEval)

  console.log(fullEval)

  // keeps the lowest score
  const result = Object.values(fullEval).reduce(function (currentScore, next) {
    if (typeof next !== typeof 0) {
      // heh.
      console.log('explode')
    }
    return next < currentScore ? next : currentScore
  }, 2)

  console.log(result)
  return result
}

// evaluateSunset([{ source: 'Darksky', forecast: darkskyRes }])

function accumulateEval (result, forecast) {
  return features.reduce(function (res, feat) {
    let score
    switch (feat) {
      case 'cloudHeight': score = evalCloudHeight(res, forecast)
        break
      case 'cloudCoverage': score = evalCloudCoverage(res, forecast)
        break
      case 'airCleanliness': score = evalAirCleanliness(res, forecast)
        break
      case 'humidity': score = evalHumidity(res, forecast)
        break
      case 'winds': score = evalWinds(res, forecast)
        break
      case 'visibility': score = evalVisibility(res, forecast)
        break
      default:
        console.log('Warning: unhandled feature! ', feat)
        return result
    }
    result[feat] = score
    return result
  }, result)
}

// TODO pull magic numbers out into manipulable form

function evalCloudHeight (res, forecast) { return 2 }

function evalCloudCoverage (res, { cloudCover }) {
  if (cloudCover > 0.5 && cloudCover < 0.7) {
    return 1
  } else if (cloudCover > 0.3 && cloudCover < 0.5) {
    return 2
  } else {
    return 0
  }
}

function evalAirCleanliness (res, forecast) {
  return 2
}

function evalHumidity (res, { humidity }) {
  if (humidity < 0.5) {
    return 1
  } else if (humidity < 0.3) {
    return 2
  } else {
    return 0
  }
}
function evalWinds (res, forecast) { return 2 }
function evalVisibility (res, forecast) { return 2 }

function formatInput (source, forecast) {
  switch (source) {
    case 'Darksky':
      return formatDarksky(forecast)
    default:
      console.log('Unhandled source: ', source)
      return {}
  }
}

function formatDarksky (forecast) {
  // until we develop our own model, use darksky's data point
  return forecast.currently
}
