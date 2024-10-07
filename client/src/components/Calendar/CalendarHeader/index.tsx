import React from 'react'

import { CalendarHeaderActions } from './CalendarHeaderActions'

import styles from './CalendarHeader.module.scss'

export const CalendarHeader = () => {
  return (
    <div className={styles.container}>
      <CalendarHeaderActions />
    </div>
  )
}
