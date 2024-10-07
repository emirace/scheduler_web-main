import { useEffect, useState } from 'react'
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns'

import { useDate } from './useDate'
import { usePreloadDays } from './usePreloadDays'
import { useView } from './useView'

export const useCalendarDates = () => {
  const { currentDate } = useDate()
  const { view } = useView()
  const preloadedDays = usePreloadDays(currentDate)
  const [filteredDays, setFilteredDays] = useState([])

  useEffect(() => {
    let days: any = []
    switch (view) {
      case 'monthly':
        days = preloadedDays.filter(
          (day: any) =>
            day >= startOfMonth(currentDate) && day <= endOfMonth(currentDate),
        )
        break
      case 'weekly': {
        const start = startOfWeek(currentDate, { weekStartsOn: 1 })
        const end = endOfWeek(currentDate, { weekStartsOn: 1 })
        days = preloadedDays.filter((day: any) => day >= start && day <= end)
        break
      }
      case 'daily':
        days = [currentDate]
        break
      default:
        break
    }
    setFilteredDays(days)
  }, [currentDate, view, preloadedDays])

  return filteredDays
}
