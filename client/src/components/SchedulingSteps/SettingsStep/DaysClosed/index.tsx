import React, { useContext } from 'react'
import { produce } from 'immer'

import styles from './DaysClosed.module.scss'

import { FormStateContext } from '@/state'

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const DaysClosed = () => {
  const { form, setForm } = useContext(FormStateContext)
  const selectedDays = form.steps.settings.daysClosed

  const toggleDaySelection = (day: string) => {
    setForm(
      produce(draft => {
        draft.steps.settings.daysClosed[day] =
          !draft.steps.settings.daysClosed[day]
      }),
    )
  }

  return (
    <div className={styles.container}>
      <h2>Days closed</h2>
      <p className={styles.description}>
        Is your business / location closed any days of the week?
      </p>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map(day => (
          <button
            key={day}
            className={styles.dayButton}
            onClick={() => toggleDaySelection(day)}
            style={{
              backgroundColor: selectedDays[day] ? '#19B250' : 'transparent',
              color: selectedDays[day] ? 'white' : 'black',
              transition: 'all 0.2s ease',
              border: selectedDays[day]
                ? '0.5px solid rgba(24, 78, 45, 0.30)'
                : '1px solid #DFDFDD',
            }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
