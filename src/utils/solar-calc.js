import SolarCalc from 'solar-calc'

export default function calculateTimeOfSunset (lat, lon) {
  const solarCalc = new SolarCalc(new Date(), lat, lon)

  return solarCalc.sunset
}
