import React from 'react'
import Image from 'next/image'

import styles from './CalendarNavigation.module.scss'

import arrowLeft from '@public/arrow-left.png'
import arrowRight from '@public/arrow-right.png'

import { useDate } from '@/hooks/useDate'
import { useView } from '@/hooks/useView'
import { adjustDate } from '@/utils/adjustDate'

export const CalendarNavigation = () => {
  const { currentDate, setCurrentDate } = useDate()
  const { view } = useView()

  const handlePeriodChange = direction => {
    const newDate = adjustDate(currentDate, view, direction)
    setCurrentDate(newDate)
  }

  const getPeriodName = () => {
    switch (view) {
      case 'monthly':
        return currentDate.toLocaleDateString('default', {
          month: 'long',
          year: 'numeric',
        })

      case 'weekly': {
        const dayOfWeek = currentDate.getDay() // Declare variable inside a block
        const startOfWeek = new Date(currentDate)
        if (dayOfWeek === 0) {
          startOfWeek.setDate(currentDate.getDate() - 6)
        } else {
          startOfWeek.setDate(currentDate.getDate() - (dayOfWeek - 1))
        }
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)

        const startOfWeekFormatted = startOfWeek.toLocaleDateString('default', {
          day: 'numeric',
          month: 'short',
        })
        const endOfWeekFormatted = endOfWeek.toLocaleDateString('default', {
          day: 'numeric',
          month: 'short',
        })
        return `${startOfWeekFormatted} - ${endOfWeekFormatted}`
      }

      case 'daily':
        return currentDate.toLocaleDateString('default', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })

      default:
        return ''
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={() => handlePeriodChange('prev')}>
        <Image src={arrowLeft} alt="arrow left" width={7} height={12} />
      </button>
      <h2>{getPeriodName()}</h2>
      <button onClick={() => handlePeriodChange('next')}>
        <Image src={arrowRight} alt="arrow right" width={7} height={12} />
      </button>
    </div>
  )
}
