import React from 'react'
import Image from 'next/image'

import styles from './EmployeeInfo.module.scss'

import removeIcon from '@public/remove-icon.svg'

import { EmployeeData } from '@/components/common/EmployeeSidebar'
import { getColorThemeByEmployeeProperty } from '@/utils/employeeColorThemes'

export const EmployeeInfo = ({
  employee,
  removeEmployee,
}: {
  employee: EmployeeData
  removeEmployee: (id: string) => void
}) => {
  const { light, text } = getColorThemeByEmployeeProperty(employee.name)
  return (
    <div className={styles.employeeCard} key={employee.id}>
      <div className={styles.employeeInfo}>
        <div
          className={styles.employeeBadge}
          style={{
            backgroundColor: light,
            color: text,
          }}
        >
          <p>
            {employee.name
              .split(' ')
              .map(name => name[0])
              .join('')}
          </p>
        </div>
        <div className={styles.employeeHeading}>
          <h3>{employee.name}</h3>
          <p>({employee.position})</p>
        </div>
        <button
          className={styles.removeButton}
          onClick={() => removeEmployee(employee.id)}
        >
          <Image src={removeIcon} alt="Remove" />
        </button>
      </div>
    </div>
  )
}
