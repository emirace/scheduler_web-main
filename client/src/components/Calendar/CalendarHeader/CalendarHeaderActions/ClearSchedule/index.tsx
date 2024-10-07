import React from 'react'
import { toast } from 'react-toastify'

import styles from './ClearSchedule.module.scss'

import { PromptModal } from '@/components/modals/PromptModal'
import { useLocations } from '@/hooks/useLocations'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'
import { defaultEmployees } from '@/store/slices/scheduleSlice'

export const ClearSchedule = () => {
  const { setSchedule, setScheduleName } = useSchedule()
  const { closeModal, isModalOpen, openModal } = useModal()
  const { setLocations } = useLocations()

  const handleClearSchedule = () => {
    try {
      setSchedule({
        employeeView: JSON.parse(JSON.stringify(defaultEmployees)),
      })
      setLocations([])
      setScheduleName('My Schedule')
      toast.success('Schedule cleared', {
        containerId: 'Global',
      })
    } catch (error) {
      toast.error('Failed to clear schedule', {
        containerId: 'Global',
      })
    } finally {
      closeModal('isClearScheduleModalOpen')
    }
  }

  return (
    <>
      <button
        className={styles.button}
        onClick={() => openModal('isClearScheduleModalOpen')}
      >
        Clear
      </button>
      <PromptModal
        isOpen={isModalOpen('isClearScheduleModalOpen')}
        header="Clear Schedule"
        closeModal={() => closeModal('isClearScheduleModalOpen')}
      >
        <div className={styles.container}>
          <h2 className={styles.header}>
            Are you sure you want to clear this schedule?
          </h2>
          <div className={styles.buttons}>
            <button
              className={styles.noButton}
              onClick={() => closeModal('isClearScheduleModalOpen')}
            >
              No
            </button>
            <button className={styles.yesButton} onClick={handleClearSchedule}>
              Yes
            </button>
          </div>
        </div>
      </PromptModal>
    </>
  )
}
