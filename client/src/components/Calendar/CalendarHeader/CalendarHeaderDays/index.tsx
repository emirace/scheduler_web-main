import React from 'react'

import styles from './CalendarHeaderDays.module.scss'

import { useCalendarDates } from '@/hooks/useCalendarDays'
import { useView } from '@/hooks/useView'

export const CalendarHeaderDays = () => {
  const currentMonthDays = useCalendarDates()
  const { view } = useView()

  if (view === 'daily') {
    return null
  }

  const formatDay = (day: Date) =>
    day.toLocaleDateString('en-US', { weekday: 'short' })

  const formatDayNumber = (day: Date) =>
    day.getDate().toString().padStart(2, '0')

  const isCurrentDay = (day: Date) => {
    const today = new Date()
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className={styles.container}>
      {currentMonthDays.map((day, index) => (
        <div key={index} className={styles.dayHeader}>
          <p>{formatDay(day)}</p>
          <span className={isCurrentDay(day) ? styles.currentDay : ''}>
            {formatDayNumber(day)}
          </span>
        </div>
      ))}
    </div>
  )
}
