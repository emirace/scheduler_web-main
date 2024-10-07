import React from 'react'
import { toast } from 'react-toastify'

import styles from './EmployeeActionButtons.module.scss'

import { EmployeeData } from '@/components/common/EmployeeSidebar'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'

export const EmployeeActionButtons = ({
  employee,
  onSave,
}: {
  employee: EmployeeData
  onSave: () => { name: string; position: string }
}) => {
  const { editEmployee } = useSchedule()
  const { closeModal } = useModal()

  const handleCancelClick = () => {
    closeModal('isEditEmployeeModalOpen')
  }

  const handleSaveClick = () => {
    const updatedData = onSave()
    if (updatedData.name === '') {
      toast.error('Please fill out Full Name in order to save employee', {
        containerId: 'EditEmployeeModal',
      })
      return
    }
    editEmployee(employee.id, onSave())
    closeModal('isEditEmployeeModalOpen')
    closeModal('isEmployeeOverviewModalOpen')
  }

  return (
    <div className={styles.container}>
      <div className={styles.rightActionButtons}>
        <button onClick={handleCancelClick} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={handleSaveClick} className={styles.editButton}>
          Save
        </button>
      </div>
    </div>
  )
}
