export const formatDate = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date'
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
