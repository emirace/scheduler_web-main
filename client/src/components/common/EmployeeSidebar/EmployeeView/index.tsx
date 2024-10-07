import React, { useState } from 'react'

import { EmployeeData } from '..'
import { EmployeeStats } from './EmployeeStats'

import styles from './EmployeeView.module.scss'

import { getColorThemeByEmployeeProperty } from '@/utils/employeeColorThemes'

export const EmployeeView = ({
  employee,
  index,
  onClick,
  isStats,
}: {
  employee: EmployeeData
  index: number
  onClick: () => void
  isStats: boolean
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const { light, text } = getColorThemeByEmployeeProperty(employee.name)

  const handleMouseEnter = () => setShowTooltip(true)
  const handleMouseLeave = () => setShowTooltip(false)

  return (
    <div className={styles.employeeCard} key={index} onClick={onClick}>
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
        <div
          className={styles.employeeHeading}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h3>{employee.name}</h3>
          <p>{employee.position}</p>
        </div>
        {showTooltip && (
          <div className={styles.tooltip}>
            <p>{employee.name}</p>
            <p> {employee.position}</p>
          </div>
        )}
      </div>
      {!isStats && <EmployeeStats employee={employee} />}
    </div>
  )
}
