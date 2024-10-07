import React from 'react'

import { EmployeeData } from '../..'

import styles from './EmployeeStats.module.scss'

import { useSchedule } from '@/hooks/useSchedule'
import { calculateTotalHours } from '@/utils/calculateTotalHours'

export const EmployeeStats = ({ employee }: { employee: EmployeeData }) => {
  const { schedule } = useSchedule()

  const employeeData = schedule?.employeeView?.find(e => e.id === employee.id)

  const totalShifts = employeeData?.shifts?.length
  const totalHours = calculateTotalHours(employeeData?.shifts)
  return (
    <div className={styles.employeeStats}>
      <p>
        <span>Shifts: </span>
        {totalShifts}
      </p>
      <p>
        <span>Hours:</span>
        {totalHours}
      </p>
    </div>
  )
}
