import React from 'react'
import ReactModal from 'react-modal'

import styles from './EditEmployeeModal.module.scss'

import { EscapeIcon } from '@/ui/escape-icon'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
}

export const EditEmployeeModal = ({ isOpen, closeModal, children }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={styles.overlay}
      className={styles.wrapper}
    >
      <h2 className={styles.header}>Edit Employee</h2>

      <button className={styles.closeButton} onClick={closeModal}>
        <EscapeIcon />
      </button>
      {children}
    </ReactModal>
  )
}
