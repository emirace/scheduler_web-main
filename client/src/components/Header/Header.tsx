import React, { useState } from 'react'

import styles from './Header.module.scss'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <div className={styles.container}>
      <h1>FREE EMPLOYEE SCHEDULING APP</h1>
      <h3>
        Make Employee Schedules & Staff Rosters for Free. Print, Share,
        Download.
      </h3>
      <p>
        <span
          onClick={openModal}
          style={{ cursor: 'pointer', marginLeft: '5px' }}
          className={styles.link}
        >
          <span>ⓘ</span>How does this work?
        </span>
      </p>
    </div>
  )
}
