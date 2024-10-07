import React, { useMemo } from 'react'

import styles from './StatsGrid.module.scss'

import { useSchedule } from '@/hooks/useSchedule'
import { useStatsTableProperties } from '@/hooks/useStatsTableProperties'
import { calculateTotalHours } from '@/utils/calculateTotalHours'

export const StatsGrid = () => {
  const properties = useStatsTableProperties()
  const { schedule } = useSchedule()

  const formatDate = dateString => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  const employees = useMemo(() => {
    return (
      schedule?.employeeView.map(employee => {
        const totalShifts = employee.shifts?.length
        const totalHours = calculateTotalHours(employee.shifts)
        const locationCounts = {}
        let totalWeekendShifts = 0
        const weekendsWithShifts = new Set()

        let fulfilledDesiredShifts = 0
        let fulfilledUndesiredShifts = 0

        employee.shifts.forEach(shift => {
          const shiftDate = new Date(shift.date)
          const formattedShiftDate = formatDate(shift.date)
          const dayOfWeek = shiftDate.getDay()
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            totalWeekendShifts++
            weekendsWithShifts.add(
              `${shiftDate.getFullYear()}-${shiftDate.getMonth()}-${Math.floor(shiftDate.getDate() / 7)}`,
            )
          }
          locationCounts[`Location: ${shift.location}`] =
            (locationCounts[`Location: ${shift.location}`] || 0) + 1

          if (employee.desiredShifts.includes(formattedShiftDate)) {
            fulfilledDesiredShifts++
          }

          if (employee.undesiredShifts.includes(formattedShiftDate)) {
            fulfilledUndesiredShifts++
          }
        })

        return {
          ...employee,
          'Total shifts': totalShifts,
          'Total hours': totalHours,
          ...locationCounts,
          'Total weekend shifts': totalWeekendShifts,
          'Separate weekends with one shift': weekendsWithShifts.size,
          'Desired shift requests': employee.desiredShifts.length,
          'Fulfilled desired shift requests': fulfilledDesiredShifts,
          'Undesired shift requests': employee.undesiredShifts.length,
          'Fulfilled undesired shift requests': fulfilledUndesiredShifts,
        }
      }) || []
    )
  }, [schedule, properties])

  if (employees.length === 0) {
    return <div>No data available</div>
  }

  return (
    <div className={styles.grid}>
      {employees.map(employee => (
        <div key={employee.id} className={styles.row}>
          {properties.map(property => (
            <div key={`${employee.id}-${property}`} className={styles.cell}>
              <p>{employee[property] || 0}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
