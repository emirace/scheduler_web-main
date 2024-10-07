import React, { useContext, useEffect } from 'react'

import { groupedConditions } from './conditions'

import styles from './ConditionsStep.module.scss'

import { IncrementInput } from '@/components/common/IncrementInput'
import { StepButtons } from '@/components/common/StepButtons'
import { ToggleSwitch } from '@/components/common/ToggleSwitch'
import { FormStateContext } from '@/state'

export const ConditionsStep = () => {
  const { form } = useContext(FormStateContext)

  const isMaxConsecutiveWorkingDays =
    form.steps.conditions.maxConsecutiveWorkingDays

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
      {isMaxConsecutiveWorkingDays && (
        <div className={styles.group}>
          <h2 className={styles.label}>{groupedConditions[0].label}</h2>
          {groupedConditions[0].conditions.map(condition => (
            <ToggleSwitch
              key={condition.id}
              id={condition.id}
              checked={form.steps.conditions[condition.id]}
              label={condition.label}
              description={condition.description}
            />
          ))}
          <IncrementInput defaultValue={5} />
        </div>
      )}
      {groupedConditions
        .slice(isMaxConsecutiveWorkingDays ? 1 : 0)
        .map((group, index, array) => (
          <div
            key={group.label}
            className={`${styles.group} ${index === array.length - 1 ? styles.lastGroup : ''}`}
          >
            <h2 className={styles.label}>{group.label}</h2>
            {group.conditions.map(condition => (
              <ToggleSwitch
                key={condition.id}
                id={condition.id}
                checked={form.steps.conditions[condition.id]}
                label={condition.label}
                description={condition.description}
              />
            ))}
          </div>
        ))}
      <StepButtons />
    </div>
  )
}
