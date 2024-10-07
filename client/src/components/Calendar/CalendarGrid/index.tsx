import React, { useMemo, useState } from 'react'

import ShiftModalManager from '../ShiftModalManager'
import { GridCell } from './GridCell'
import { ShiftDisplay } from './ShiftDisplay'

import styles from './CalendarGrid.module.scss'

import { useCalendarDates } from '@/hooks/useCalendarDays'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'
import { ShiftType } from '@/types/AddShiftType'
import { EmployeeType } from '@/types/EmployeeType'

interface EmployeeWithShifts extends EmployeeType {
  datesMappedByDateString: { [dateString: string]: EmployeeType }
}

export const CalendarGrid = () => {
  const { schedule } = useSchedule()

  const currentMonthDays = useCalendarDates()
  const { openModal } = useModal()
  const [selectedShift, setSelectedShift] = useState<ShiftType | null>(null)

  const employees = useMemo(() => {
    return schedule?.employeeView.map(employee => ({
      ...employee,
      datesMappedByDateString: employee.shifts?.reduce((acc, current) => {
        const dateString = new Date(current.date).toDateString()
        acc[dateString] = current
        return acc
      }, {}),
    }))
  }, [schedule])

  if (schedule.employeeView.length === 0) {
    return <div>No employees</div>
  }

  const handleCellClick = (
    day: Date,
    employee: EmployeeType,
    isShiftPresent: boolean,
  ) => {
    const dateString = day.toDateString()
    const shiftData =
      (employee as EmployeeWithShifts).datesMappedByDateString[dateString] ||
      null

    setSelectedShift({ day, employee, shiftData })
    const modalId = isShiftPresent
      ? 'isEditShiftModalOpen'
      : 'isAddShiftModalOpen'
    openModal(modalId)
  }

  return (
    <div className={styles.grid}>
      {employees?.map((employee, employeeIndex) => {
        return (
          <div key={employeeIndex} className={`${styles.row} row`}>
            {currentMonthDays.map((day: Date) => {
              const isShiftPresent =
                !!employee.datesMappedByDateString[day.toDateString()]
              return (
                <GridCell
                  key={`${day.toISOString()}-${employeeIndex}`}
                  day={day}
                  employee={employee}
                  employeeIndex={employeeIndex}
                  isShiftPresent={isShiftPresent}
                  shift={<ShiftDisplay day={day} employeeData={employee} />}
                  handleCellClick={handleCellClick}
                />
              )
            })}
          </div>
        )
      })}
      <ShiftModalManager selectedShift={selectedShift} />
    </div>
  )
}
