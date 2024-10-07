import React from 'react'
import Image from 'next/image'

import styles from './AddEmployeeHeader.module.scss'

import plusIcon from '@public/plus-icon-dark.svg'

import { AddEmployee } from '@/components/Calendar/ShiftModalManager/AddEmployee'
import { AddEmployeeModal } from '@/components/modals/AddEmployeeModal'
import { useModal } from '@/hooks/useModal'

export const AddEmployeeHeader = () => {
  const { openModal, closeModal, isModalOpen } = useModal()

  return (
    <>
      {isModalOpen('isAddEmployeeModalOpen') && (
        <AddEmployeeModal
          isOpen={isModalOpen('isAddEmployeeModalOpen')}
          closeModal={() => closeModal('isAddEmployeeModalOpen')}
        >
          <AddEmployee />
        </AddEmployeeModal>
      )}
      <button
        className={styles.addShiftButton}
        onClick={() => openModal('isAddEmployeeModalOpen')}
      >
        <Image src={plusIcon} alt="+" />
        <p>Employee</p>
      </button>
    </>
  )
}
