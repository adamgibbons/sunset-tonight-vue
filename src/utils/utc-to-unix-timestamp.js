export default function utcToUnixTimestamp (dateString) {
  const seconds = new Date(dateString).getTime()  / 1000

  return seconds
}
