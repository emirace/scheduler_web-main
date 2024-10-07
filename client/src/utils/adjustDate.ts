import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'

export const adjustDate = (currentDate, view, direction) => {
  switch (view) {
    case 'monthly':
      return direction === 'next'
        ? addMonths(currentDate, 1)
        : subMonths(currentDate, 1)
    case 'weekly':
      return direction === 'next'
        ? addWeeks(currentDate, 1)
        : subWeeks(currentDate, 1)
    case 'daily':
      return direction === 'next'
        ? addDays(currentDate, 1)
        : subDays(currentDate, 1)
    default:
      return currentDate
  }
}
