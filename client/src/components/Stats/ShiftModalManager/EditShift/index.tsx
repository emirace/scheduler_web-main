import React from 'react'

import styles from './EditShift.module.scss'

import { ActionButtons } from '@/components/common/ActionButtons'
import { DateSelect } from '@/components/common/DateSelect'
import { EmployeeSelect } from '@/components/common/EmployeeSelect'
import { Location } from '@/components/common/Location'
import { TimeSelect } from '@/components/common/TimeSelect'

export const EditShift = () => {
  return (
    <div className={styles.container}>
      <DateSelect />
      <EmployeeSelect />
      <Location />
      <TimeSelect />
      <ActionButtons />
    </div>
  )
}
