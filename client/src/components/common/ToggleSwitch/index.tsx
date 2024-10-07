import React, { useContext } from 'react'
import { produce } from 'immer'

import styles from './ToggleSwitch.module.scss'

import { FormStateContext } from '@/state'

export const ToggleSwitch = ({ id, checked, label, description }) => {
  const { setForm } = useContext(FormStateContext)

  const onChange = value => {
    setForm(
      produce(form => {
        form.steps.conditions[id] = value
      }),
    )
  }
  function handleKeyPress(e) {
    if (e.keyCode !== 32) {
      return
    }

    e.preventDefault()
    onChange(!checked)
  }

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <h2 className={styles.label}>{label}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.toggleSwitchCheckbox}
          id={id}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={false}
        />
        {id && (
          <label
            className={styles.toggleSwitchLabel}
            tabIndex={-1}
            onKeyDown={e => handleKeyPress(e)}
            htmlFor={id}
          >
            <span className={styles.toggleSwitchInner} tabIndex={-1} />
            <span className={styles.toggleSwitchSwitch} tabIndex={-1} />
          </label>
        )}
      </div>
    </div>
  )
}
