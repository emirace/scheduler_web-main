import { useEffect, useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

import useTimezone from './useTimezone'

export const usePreloadDays = currentDate => {
  const [days, setDays] = useState([])
  const userTimezone = useTimezone()

  useEffect(() => {
    const preloadStart = subMonths(startOfMonth(currentDate), 3)
    const preloadEnd = addMonths(endOfMonth(currentDate), 3)

    const zonedStartDate = utcToZonedTime(preloadStart, userTimezone)
    const zonedEndDate = utcToZonedTime(preloadEnd, userTimezone)

    const preloadedDays: any = eachDayOfInterval({
      start: zonedStartDate,
      end: zonedEndDate,
    })

    setDays(preloadedDays)
  }, [currentDate, userTimezone])

  return days
}
