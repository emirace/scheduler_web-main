import React from 'react'

import { EditableDate } from './EditableDate'
import { PreFilledDate } from './PreFilledDate'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './DateSelect.module.scss'

import { useShiftFormContext } from '@/state/shift'
import { formatDate } from '@/utils/formatDate'

export const DateSelect = () => {
  const { formData, updateFormData, isAddFromCell, isEditMode, errors } =
    useShiftFormContext()

  const renderDateComponent = () => {
    switch (true) {
      case isAddFromCell:
        return <PreFilledDate date={formatDate(formData.day)} />
      case isEditMode:
      default:
        return (
          <EditableDate
            selectedDate={formData.day}
            onChange={date =>
              updateFormData('day', date ? new Date(date) : new Date())
            }
          />
        )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.dateWrapper}>
        <p>Date</p>
        {renderDateComponent()}
      </div>
      {errors.day && <p className="error-message">{errors.day}</p>}
    </div>
  )
}
