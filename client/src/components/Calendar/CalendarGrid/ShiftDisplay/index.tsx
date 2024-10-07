import { memo, useState } from 'react'

import styles from './ShiftDisplay.module.scss'

import { useFilter } from '@/hooks/useFilter'
import { getColorThemeByEmployeeProperty } from '@/utils/employeeColorThemes'

export const ShiftDisplay = memo(({ day, employeeData }: any) => {
  const [isHovering, setIsHovering] = useState(false)
  const { filters } = useFilter()
  const dateString = day.toDateString()
  const shift = employeeData.datesMappedByDateString[dateString]

  if (!shift) {
    return null
  }
  if (!shift.hours) {
    return null
  }

  if (filters.location && shift.location !== filters.location) {
    return null
  }

  const { dark } = getColorThemeByEmployeeProperty(employeeData.name)

  function normalizeTimeStr(timeStr) {
    return timeStr.toUpperCase().replace(/\s+/g, '')
  }

  function convertTo24HourFormat(time) {
    time = normalizeTimeStr(time)
    const AMPM = time.slice(-2)
    let [hours, minutes] = time.slice(0, -2).split(':')
    minutes = minutes || '00'
    hours = parseInt(hours, 10)

    if (AMPM === 'PM' && hours < 12) {
      hours += 12
    } else if (AMPM === 'AM' && hours === 12) {
      hours = 0
    }
    hours = hours < 10 ? `0${hours}` : hours.toString()

    return `${hours}:${minutes}`
  }

  const hours = shift.hours.split(/\s*-\s*/)
  const start = convertTo24HourFormat(hours[0].trim())
  const end = convertTo24HourFormat(hours[1].trim())

  const renderLocation = location => {
    const words = location.split(' ')
    const formattedWords: string[] = []

    for (let i = 0; i < words.length; i++) {
      if (
        i === 0 &&
        words.length > 1 &&
        !isNaN(words[1]) &&
        !isNaN(parseFloat(words[1]))
      ) {
        formattedWords.push(`${words[i]} ${words[i + 1]}`)
        i++
      } else {
        formattedWords.push(words[i])
      }
    }

    return formattedWords.map((word, index) => (
      <span key={index} className={styles.word}>
        {word}
      </span>
    ))
  }

  return (
    start &&
    end && (
      <div className={styles.shift}>
        <div className={styles.shiftBorder} style={{ backgroundColor: dark }} />
        <div
          className={styles.location}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering && (
            <div className={styles.tooltip} style={{ display: 'block' }}>
              {shift.location}
            </div>
          )}
          {renderLocation(shift.location)}
        </div>
        <div className={styles.hoursContainer}>
          <span>{start}</span>
          <span>{end}</span>
        </div>
      </div>
    )
  )
})
