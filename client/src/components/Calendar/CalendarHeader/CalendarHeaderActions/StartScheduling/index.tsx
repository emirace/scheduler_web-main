import React from 'react'
import Image from 'next/image'

import styles from './StartScheduling.module.scss'

import generateStars from '@public/generate-stars.svg'

import { SchedulingStepsModal } from '@/components/modals/SchedulingStepsModal'
import { SchedulingSteps } from '@/components/SchedulingSteps'
import { useModal } from '@/hooks/useModal'
import { FormStateProvider } from '@/state'

export const StartScheduling = () => {
  const { openModal, closeModal, isModalOpen } = useModal()

  return (
    <>
      {isModalOpen('isSchedulingModalOpen') && (
        <FormStateProvider>
          <SchedulingStepsModal
            isOpen={isModalOpen('isSchedulingModalOpen')}
            closeModal={() => closeModal('isSchedulingModalOpen')}
          >
            <SchedulingSteps />
          </SchedulingStepsModal>
        </FormStateProvider>
      )}
      <button
        className={styles.startSchedulingButton}
        onClick={() => openModal('isSchedulingModalOpen')}
      >
        <Image src={generateStars} alt="Generate stars" />
        <p>Start Scheduling</p>
      </button>
    </>
  )
}
