import React from 'react'

import styles from './DeleteEmployee.module.scss'

import { useModal } from '@/hooks/useModal'

export const DeleteEmployee = ({
  onConfirmRemove,
}: {
  onConfirmRemove: () => void
}) => {
  const { closeModal } = useModal()

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Are you sure you want to delete this employee?
      </h2>
      <div className={styles.buttons}>
        <button
          className={styles.noButton}
          onClick={() => closeModal('isRemoveEmployeeModalOpen')}
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
