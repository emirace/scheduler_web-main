import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './ActionButtons.module.scss'

import { PromptModal } from '@/components/modals/PromptModal'
import { RemoveShift } from '@/components/RemoveShift'
import { useLocations } from '@/hooks/useLocations'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'
import useTimezone from '@/hooks/useTimezone'
import { useShiftFormContext } from '@/state/shift'
import { formatDateToISOWithTimezone } from '@/utils/formatDateToIso'

export const ActionButtons = () => {
  const { formData, isAddFromCell, isEditMode, validateForm } =
    useShiftFormContext()
  const { schedule, setSchedule } = useSchedule()
  const { closeModal, isModalOpen, openModal } = useModal()
  const { updateLocations } = useLocations()
  const timezone = useTimezone()

  const handleRemoveShift = () => {
    const updatedEmployeeView = schedule?.employeeView.map(employee => ({
      ...employee,
      shifts: employee.shifts.filter(shift => shift.id !== formData.id),
    }))
    setSchedule({ ...schedule, employeeView: updatedEmployeeView })
    updateLocations()
    closeModal('isRemoveShiftModalOpen')
    closeModal('isEditShiftModalOpen')
  }

  const handleCloseModal = () => {
    if (isAddFromCell) {
      closeModal('isAddShiftModalOpen')
    } else if (isEditMode) {
      closeModal('isEditShiftModalOpen')
    } else {
      closeModal('isNewShiftModalOpen')
    }
  }

  const handleShiftSave = () => {
    if (!validateForm()) {
      return
    }

    const isEmployeeChanged =
      formData.employeeId !== formData.originalEmployeeId

    const originalEmployeeIndex = schedule?.employeeView.findIndex(
      e => e.id === formData.originalEmployeeId,
    )
    const newEmployeeIndex = schedule?.employeeView.findIndex(
      e => e.id === formData.employeeId,
    )

    const getWeekdayFromDate = dateStr => {
      const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      const date = new Date(dateStr)
      return weekdays[date.getDay()]
    }

    const shiftData = {
      date: formatDateToISOWithTimezone(new Date(formData.day), timezone),
      hours: formData.hours,
      id: isEditMode ? formData.id : uuidv4(),
      location: formData.location,
      weekday: getWeekdayFromDate(formData.day),
    }

    const newScheduleView = [...schedule.employeeView]
    if (isEmployeeChanged && originalEmployeeIndex !== -1) {
      newScheduleView[originalEmployeeIndex].shifts = newScheduleView[
        originalEmployeeIndex
      ].shifts.filter(shift => shift.id !== formData.id)
    }

    if (newEmployeeIndex !== -1) {
      const existingShiftIndex = newScheduleView[
        newEmployeeIndex
      ].shifts.findIndex(shift => shift.id === formData.id)
      if (existingShiftIndex !== -1) {
        newScheduleView[newEmployeeIndex].shifts[existingShiftIndex] = shiftData
      } else {
        newScheduleView[newEmployeeIndex].shifts.push(shiftData)
      }
    } else {
      console.error('New employee not found.')
      return
    }

    updateLocations()
    setSchedule({ ...schedule, employeeView: newScheduleView })
    handleCloseModal()
  }

  return (
    <div className={styles.container}>
      {isEditMode && (
        <button
          className={styles.removeShift}
          onClick={() => openModal('isRemoveShiftModalOpen')}
        >
          Remove
        </button>
      )}
      <div className={styles.rightButtons}>
        <button className={styles.cancel} onClick={handleCloseModal}>
          Cancel
        </button>
        <button className={styles.save} onClick={handleShiftSave}>
          Save
        </button>
      </div>
      {isModalOpen('isRemoveShiftModalOpen') && (
        <PromptModal
          isOpen={isModalOpen('isRemoveShiftModalOpen')}
          header="Remove Shift"
          closeModal={() => closeModal('isRemoveShiftModalOpen')}
        >
          <RemoveShift onConfirmRemove={handleRemoveShift} />
        </PromptModal>
      )}
    </div>
  )
}
