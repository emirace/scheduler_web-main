import React from 'react'

import styles from './EmployeeHeading.module.scss'

import { EmployeeData } from '@/components/common/EmployeeSidebar'

export const EmployeeHeading = ({ employee }: { employee: EmployeeData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.fullName}>
        <p>Full Name</p>
        <h3>{employee.name}</h3>
      </div>
      <div className={styles.role}>
        <p>Role</p>
        <h3>{employee.position}</h3>
      </div>
    </div>
  )
}
