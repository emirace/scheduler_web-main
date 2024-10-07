import React from 'react'

import { AddShift } from './AddShift'
import { EditShift } from './EditShift'

import { ShiftActionModal } from '@/components/modals/ShiftActionModal'
import { useModal } from '@/hooks/useModal'
import { ShiftFormProvider } from '@/state/shift'

const ShiftModalManager = ({ selectedShift }) => {
  const { isModalOpen, closeModal } = useModal()

  const isOpen =
    isModalOpen('isAddShiftModalOpen') || isModalOpen('isEditShiftModalOpen')

  const ModalContent = isModalOpen('isEditShiftModalOpen')
    ? EditShift
    : AddShift

  if (!isOpen) {
    return null
  }
  return (
    <ShiftFormProvider initialFormData={selectedShift}>
      <ShiftActionModal
        isOpen={isOpen}
        closeModal={() =>
          closeModal(
            isModalOpen('isEditShiftModalOpen')
              ? 'isEditShiftModalOpen'
              : 'isAddShiftModalOpen',
          )
        }
        isEdit={isModalOpen('isEditShiftModalOpen')}
      >
        <ModalContent />
      </ShiftActionModal>
    </ShiftFormProvider>
  )
}

export default ShiftModalManager
