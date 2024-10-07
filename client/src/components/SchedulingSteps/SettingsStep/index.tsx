import React, { useEffect } from 'react'

import { DaysClosed } from './DaysClosed'
import { GenerationMode } from './GenerationMode'
import { SettingsDates } from './SettingsDates'
import { SettingsDescription } from './SettingsDescription'

import styles from './SettingsStep.module.scss'

import { StepButtons } from '@/components/common/StepButtons'

export const SettingsStep = () => {
  useEffect(() => {
    const container: any = document.querySelector(`.padding`)
    if (!container) {
      return
    }
    const checkScrollbar = () => {
      if (container.scrollHeight > container.clientHeight) {
        container.style.paddingRight = '20px'
      } else {
        container.style.paddingRight = '0'
      }
    }

    checkScrollbar()
    window.addEventListener('resize', checkScrollbar)

    return () => {
      window.removeEventListener('resize', checkScrollbar)
    }
  }, [])

  return (
    <div className={[styles.container, 'step-inner', 'padding'].join(' ')}>
      <SettingsDescription />
      <SettingsDates />
      <GenerationMode />
      <DaysClosed />
      <StepButtons />
    </div>
  )
}
