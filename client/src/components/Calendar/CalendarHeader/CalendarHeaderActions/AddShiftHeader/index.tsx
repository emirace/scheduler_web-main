import React from 'react'
import Image from 'next/image'

import styles from './AddShift.module.scss'

import plusIcon from '@public/plus-icon-dark.svg'

import { AddShift } from '@/components/Calendar/ShiftModalManager/AddShift'
import { ShiftActionModal } from '@/components/modals/ShiftActionModal'
import { useModal } from '@/hooks/useModal'
import { ShiftFormProvider } from '@/state/shift'

export const AddShiftHeader = () => {
  const { openModal, closeModal, isModalOpen } = useModal()

  const handleAddShift = () => {
    openModal('isNewShiftModalOpen')
  }
  return (
    <>
      {isModalOpen('isNewShiftModalOpen') && (
        <ShiftFormProvider initialFormData={null}>
          <ShiftActionModal
            isOpen={isModalOpen('isNewShiftModalOpen')}
            closeModal={() => closeModal('isNewShiftModalOpen')}
          >
            <AddShift />
          </ShiftActionModal>
        </ShiftFormProvider>
      )}
      <button className={styles.addShiftButton} onClick={handleAddShift}>
        <Image src={plusIcon} alt="+" />
        <p>Shift</p>
      </button>
    </>
  )
}
