import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const formatDateToISOWithTimezone = (date, timezone) => {
  const zonedDate = utcToZonedTime(date, timezone)
  return format(zonedDate, 'yyyy-MM-dd')
}
