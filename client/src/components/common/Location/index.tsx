import React from 'react'

import styles from './Location.module.scss'

import { useShiftFormContext } from '@/state/shift'

export const Location = () => {
  const { formData, updateFormData, errors } = useShiftFormContext()
  return (
    <div className={styles.container}>
      <p>Location</p>
      <input
        type="text"
        placeholder="Add location..."
        value={formData.location}
        onChange={e => updateFormData('location', e.target.value)}
        className={styles.input}
      />
      {errors.location && <p className="error-message">{errors.location}</p>}
    </div>
  )
}
