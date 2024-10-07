import React from 'react'
import ReactModal from 'react-modal'

import styles from './AddEmployeeModal.module.scss'

import { EscapeIcon } from '@/ui/escape-icon'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
}

export const AddEmployeeModal = ({ isOpen, closeModal, children }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={styles.overlay}
      className={styles.wrapper}
    >
      <h2 className={styles.header}>Add Employee/ Staff Members</h2>
      <p className={styles.description}>
        Enter full names and their role to add employees to your schedule.
      </p>
      <button className={styles.closeButton} onClick={closeModal}>
        <EscapeIcon />
      </button>
      {children}
    </ReactModal>
  )
}
