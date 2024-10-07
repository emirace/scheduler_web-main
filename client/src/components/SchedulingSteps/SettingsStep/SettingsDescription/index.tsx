import React from 'react'

import styles from './SettingsDescription.module.scss'

export const SettingsDescription = () => {
  return (
    <div className={styles.container}>
      <h1>Scheduler Settings & Controls</h1>
      <p>
        Use these advanced settings to help tell our AI how you want your staff
        to be scheduled.
      </p>
    </div>
  )
}
