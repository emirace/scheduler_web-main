export const normalizeTime = timeString => {
  const [time, modifier] = timeString.split(/(AM|PM)/i).filter(Boolean)
  let [hours, minutes] = time.split(':')

  if (hours.length === 1) {
    hours = `0${hours}`
  }
  if (!minutes) {
    minutes = '00'
  }

  return `${hours}:${minutes}${modifier.toUpperCase()}`
}
