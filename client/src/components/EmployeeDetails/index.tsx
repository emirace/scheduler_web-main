import React from 'react'

import { EmployeeData } from '../common/EmployeeSidebar'
import { EmployeeActionButtons } from './EmployeeActionButtons'
import { EmployeeHeading } from './EmployeeHeading'

import styles from './EmployeeDetails.module.scss'

export const EmployeeDetails = ({ employee }: { employee: EmployeeData }) => {
  return (
    <div className={styles.container} key={employee.id}>
      <EmployeeHeading employee={employee} />
      <EmployeeActionButtons employee={employee} />
    </div>
  )
}
