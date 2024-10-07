import React from 'react'
import ReactModal from 'react-modal'

import styles from './PromptModal.module.scss'

import { EscapeIcon } from '@/ui/escape-icon'

type Props = {
  header: string
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
  isEdit?: boolean
}

export const PromptModal = ({
  isOpen,
  closeModal,
  children,
  header,
}: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={styles.overlay}
      className={styles.wrapper}
    >
      <h2 className={styles.header}>{header}</h2>
      <button className={styles.closeButton} onClick={closeModal}>
        <EscapeIcon />
      </button>
      {children}
    </ReactModal>
  )
}
