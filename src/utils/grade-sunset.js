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
  if (cloudCover < 0.3 || cloudCover > 0.7) return false

  if (visibility < 3) return false

  if (humidity > 0.75) return false

  if (precipProbability > 0.8) return false

  return true
}
