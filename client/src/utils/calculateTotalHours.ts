import { addDays, differenceInMinutes, parse } from 'date-fns'

import { normalizeTime } from './normalizeTime'

export const calculateTotalHours = shifts => {
  const totalMinutes = shifts?.reduce((total, shift) => {
    const [startTime, endTime] = shift.hours.split(' - ').map(normalizeTime)
    const startDate = parse(startTime, 'hh:mma', new Date())
    const endDate = parse(endTime, 'hh:mma', new Date())

    if (endDate < startDate) {
      total += differenceInMinutes(addDays(endDate, 1), startDate)
    } else {
      total += differenceInMinutes(endDate, startDate)
    }

    return total
  }, 0)

  return (totalMinutes / 60).toFixed(2)
}
