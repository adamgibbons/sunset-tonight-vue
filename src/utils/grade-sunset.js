export default function ({
  summary,
  precipIntensity,
  precipProbability,
  humidity,
  pressure,
  windSpeed,
  windGust,
  cloudCover,
  visibility,
  ozone
}) {

  if (cloudCover < .3 || cloudCover > .7) return false

  if (visibility < 3) return false

  if (humidity > .75) return false

  if (precipProbability > .8) return false

  return true
}
