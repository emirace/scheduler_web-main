import React from 'react'

import styles from './EmployeeActionButtons.module.scss'

import { EmployeeData } from '@/components/common/EmployeeSidebar'
import { DeleteEmployee } from '@/components/DeleteEmployee'
import { EditEmployee } from '@/components/EditEmployee'
import { EditEmployeeModal } from '@/components/modals/EditEmployeeModal'
import { PromptModal } from '@/components/modals/PromptModal'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'

export const EmployeeActionButtons = ({
  employee,
}: {
  employee: EmployeeData
}) => {
  const { removeEmployee } = useSchedule()
  const { closeModal, openModal, isModalOpen } = useModal()
  const handleDeleteClick = () => {
    openModal('isRemoveEmployeeModalOpen')
  }

  const handleCancelClick = () => {
    closeModal('isEmployeeOverviewModalOpen')
  }

  const handleEditClick = () => {
    openModal('isEditEmployeeModalOpen')
  }

  const handleRemoveEmployee = () => {
    removeEmployee(employee.id)
    closeModal('isRemoveEmployeeModalOpen')
    closeModal('isEmployeeOverviewModalOpen')
  }
  return (
    <div className={styles.container}>
      <button onClick={handleDeleteClick} className={styles.deleteButton}>
        Delete
      </button>
      <div className={styles.rightActionButtons}>
        <button onClick={handleCancelClick} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={handleEditClick} className={styles.editButton}>
          Edit
        </button>
      </div>
      {isModalOpen('isRemoveEmployeeModalOpen') && (
        <PromptModal
          isOpen={isModalOpen('isRemoveEmployeeModalOpen')}
          header="Delete Employee"
          closeModal={() => closeModal('isRemoveEmployeeModalOpen')}
        >
          <DeleteEmployee onConfirmRemove={handleRemoveEmployee} />
        </PromptModal>
      )}
      {isModalOpen('isEditEmployeeModalOpen') && (
        <EditEmployeeModal
          isOpen={isModalOpen('isEditEmployeeModalOpen')}
          closeModal={() => closeModal('isEditEmployeeModalOpen')}
        >
          <EditEmployee employee={employee} />
        </EditEmployeeModal>
      )}
    </div>
  )
}
