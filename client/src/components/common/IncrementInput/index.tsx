import React, { useContext } from 'react'
import { produce } from 'immer'
import Image from 'next/image'

import styles from './IncrementInput.module.scss'

import minusIcon from '@public/minus.svg'
import plusIcon from '@public/plus.svg'

import { FormStateContext } from '@/state'
import { Form } from '@/types/FormStateTypes'

interface IncrementInputProps {
  defaultValue?: number
}

export const IncrementInput: React.FC<IncrementInputProps> = ({
  defaultValue = 5,
}) => {
  const { form, setForm } = useContext(FormStateContext)

  const maxConsecutiveWorkingDays =
    form.steps.conditions.setMaxConsecutiveWorkingDays ?? defaultValue

  const handleIncrement = () => {
    setForm(
      produce((form: Form) => {
        form.steps.conditions.setMaxConsecutiveWorkingDays =
          maxConsecutiveWorkingDays + 1
      }),
    )
  }

  const handleDecrement = () => {
    if (maxConsecutiveWorkingDays > 1) {
      setForm(
        produce((form: Form) => {
          form.steps.conditions.setMaxConsecutiveWorkingDays =
            maxConsecutiveWorkingDays - 1
        }),
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          disabled
          value={form.steps.conditions.setMaxConsecutiveWorkingDays}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={handleIncrement} className={styles.button}>
            <Image src={plusIcon} alt="plus" width={15} height={15} />
          </button>
          <button onClick={handleDecrement} className={styles.button}>
            <Image src={minusIcon} alt="minus" width={15} height={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
