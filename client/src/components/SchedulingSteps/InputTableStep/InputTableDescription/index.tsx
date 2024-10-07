import React, { useContext, useState } from 'react'

import styles from './InputTableDescription.module.scss'

import { FormStateContext } from '@/state/form'

export const InputTableDescription = () => {
  const { setForm } = useContext(FormStateContext)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const switchModal = () => {
    setForm(prev => ({ ...prev, index: 0 }))
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Input your employee and shift file (CSV / XLSX Excel format)</h1>
        <span
          onClick={switchModal}
          style={{ cursor: 'pointer', marginLeft: '5px' }}
        >
          Or upload the employee and shift file
        </span>
        <div className={styles.description}>
          <p>
            To create your employee schedule, we first need a list of employees,
            shifts, opening times, closed days, etc.
          </p>
          <p>
            If you get stuck, here is a step by step tutorial →
            <span
              onClick={openModal}
              style={{ cursor: 'pointer', marginLeft: '5px' }}
            >
              How to use the Scheduler
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
