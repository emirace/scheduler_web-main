import React, { useContext } from 'react'
import ReactModal from 'react-modal'
import { ToastContainer } from 'react-toastify'

import styles from './SchedulingStepsModal.module.scss'

import { FormStateContext } from '@/state'
import { EscapeIcon } from '@/ui/escape-icon'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
}

export const SchedulingStepsModal = ({
  isOpen,
  closeModal,
  children,
}: Props) => {
  const { form } = useContext(FormStateContext)
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName={styles.overlay}
      className={styles.wrapper}
    >
      <h2 className={styles.header}>
        Step {Math.trunc(form.index / 2) + 1} of 3
      </h2>
      <button className={styles.closeButton} onClick={closeModal}>
        <EscapeIcon />
      </button>
      {children}
      <ToastContainer position="top-center" containerId={'ScheduleModal'} />
    </ReactModal>
  )
}
