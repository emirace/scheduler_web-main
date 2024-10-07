import React from 'react'

import styles from './GettingStartedPopup.module.scss'

import { EscapeIcon } from '@/ui/escape-icon'

const GettingStartedPopup = ({ onClose }: { onClose: () => void }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className={styles.gettingStartedPopup}>
      <div className={styles.content}>
        <h5 className={styles.gettingStartedTitle}>Getting Started 👋</h5>
        <p>Add Employees & Shifts or use the Schedule AI 🧠 to get started.</p>
        <br />
        <p className={styles.needHelp}>
          <span>Need Help? Watch this</span>
          <button onClick={handleOpen}>'How to Schedule'</button>
          <span>demo</span>
        </p>
        <button onClick={onClose} className={styles.closeButton}>
          <EscapeIcon />
        </button>
      </div>
    </div>
  )
}

export default GettingStartedPopup
