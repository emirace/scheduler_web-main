import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import Image from 'next/image'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './TimeSelect.module.scss'

import dropdownIcon from '@public/dropdown.svg'

import { useShiftFormContext } from '@/state/shift'
import { formatTime } from '@/utils/formatTime'

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button className={styles.dateButton} onClick={onClick} ref={ref}>
    {value}
    <Image src={dropdownIcon} alt="dropdown" />
  </button>
))

const timeStringToDate = timeString => {
  if (typeof timeString !== 'string') {
    console.error('timeStringToDate was called without a string:', timeString)
    return new Date()
  }

  const normalizedTimeString = timeString.toUpperCase().trim()

  const [timePart, modifier] = normalizedTimeString
    .split(/(AM|PM)/)
    .filter(Boolean)

  let hours, minutes
  if (timePart.includes(':')) {
    ;[hours, minutes] = timePart.split(':')
  } else {
    hours = timePart
    minutes = '00'
  }

  hours = parseInt(hours, 10)
  if (modifier === 'AM' && hours === 12) {
    hours = 0
  } else if (modifier === 'PM' && hours < 12) {
    hours += 12
  }

  const date = new Date()
  date.setHours(hours, parseInt(minutes, 10), 0, 0)

  return date
}

export const TimeSelect = () => {
  const { formData, updateFormData, errors } = useShiftFormContext()

  const handleTimeChange = (isStart, date) => {
    const formattedTime = formatTime(date)

    const times = formData.hours
      ? formData.hours.split(/\s*-\s*/)
      : ['9:00AM', '5:00PM']
    const newTimes = isStart
      ? [formattedTime, times[1]]
      : [times[0], formattedTime]

    updateFormData('hours', `${newTimes[0]} - ${newTimes[1]}`)
  }

  const startTime = formData.hours
    ? timeStringToDate(formData.hours.split(/\s*-\s*/)[0])
    : new Date()
  const endTime = formData.hours
    ? timeStringToDate(formData.hours.split(/\s*-\s*/)[1])
    : new Date()

  return (
    <div className={styles.container}>
      <div className={styles.dateButtonsContainer}>
        <div className={styles.dateWrapper}>
          <p>Start time</p>
          <DatePicker
            selected={startTime}
            onChange={time => handleTimeChange(true, time)}
            showTimeSelect
            timeIntervals={15}
            showTimeSelectOnly
            popperPlacement="bottom"
            wrapperClassName={styles.datepickerWrapper}
            customInput={<ExampleCustomInput />}
            dateFormat="h:mmaa"
          />
        </div>
        <div className={styles.dateWrapper}>
          <p>End time</p>
          <DatePicker
            selected={endTime}
            onChange={time => handleTimeChange(false, time)}
            showTimeSelect
            timeIntervals={15}
            showTimeSelectOnly
            wrapperClassName={styles.datepickerWrapper}
            customInput={<ExampleCustomInput />}
            dateFormat="h:mmaa"
          />
        </div>
      </div>
      {errors.hours && <p className="error-message">{errors.hours}</p>}
    </div>
  )
}
