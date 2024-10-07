import React from 'react'
import ReactModal from 'react-modal'

import styles from './ShiftActionModal.module.scss'

import { EscapeIcon } from '@/ui/escape-icon'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
  isEdit?: boolean
}

export const ShiftActionModal = ({ isOpen, closeModal, children }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={styles.overlay}
      className={styles.wrapper}
    >
      <h2 className={styles.header}>Clear Shift</h2>
      <button className={styles.closeButton} onClick={closeModal}>
        <EscapeIcon />
      </button>
      {children}
    </ReactModal>
  )
}
