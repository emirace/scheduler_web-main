import { memo, useState } from 'react'

import styles from './ShiftDisplay.module.scss'

import { getColorThemeByEmployeeProperty } from '@/utils/employeeColorThemes'

export const ShiftDisplay = memo(({ day, employeeData }: any) => {
  const [isHovering, setIsHovering] = useState(false)
  const dateString = day.toDateString()
  const shift = employeeData.datesMappedByDateString[dateString]

  if (!shift) {
    return null
  }
  if (!shift.hours) {
    return null
  }
  const { dark } = getColorThemeByEmployeeProperty(employeeData.name)

  function convertTo24HourFormat(time) {
    const AMPM = time.slice(-2)
    let [hours, minutes] = time.split(':')
    minutes = minutes?.slice(0, 2)
    hours = parseInt(hours, 10)

    if (AMPM === 'PM' && hours < 12) {
      hours += 12
    } else if (AMPM === 'AM' && hours === 12) {
      hours = 0
    }
    hours = hours < 10 ? `0${hours}` : hours.toString()
    minutes = minutes || '00'

    return `${hours}:${minutes}`
  }

  const hours = shift.hours.split(' - ')
  const start = convertTo24HourFormat(hours[0])
  const end = convertTo24HourFormat(hours[1])
  const renderLocation = location => {
    const words: any[] = location.split(' ')
    const formattedWords: any[] = []

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
