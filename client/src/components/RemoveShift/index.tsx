import React from 'react'

import styles from './RemoveShift.module.scss'

import { useModal } from '@/hooks/useModal'

export const RemoveShift = ({
  onConfirmRemove,
}: {
  onConfirmRemove: () => void
}) => {
  const { closeModal } = useModal()

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Are you sure you want to remove this shift?
      </h2>
      <div className={styles.buttons}>
        <button
          className={styles.noButton}
          onClick={() => closeModal('isRemoveShiftModalOpen')}
        >
          No
        </button>
        <button className={styles.yesButton} onClick={onConfirmRemove}>
          Yes
        </button>
      </div>
    </div>
  )
}
