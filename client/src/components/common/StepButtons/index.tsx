import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Image from 'next/image'

import { useFormData } from './formFields'

import styles from './StepButtons.module.scss'

import greaterIcon from '@public/greater-icon.svg'
import lessIcon from '@public/less-icon.svg'

import { useDate } from '@/hooks/useDate'
import { useFormNavigation } from '@/hooks/useFormNavigation'
import { useLoading } from '@/hooks/useLoading'
import { useLocations } from '@/hooks/useLocations'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'
import { useScheduleDateRange } from '@/hooks/useScheduleDateRange'
import { FormStateContext } from '@/state'
import { findFirstShiftDate } from '@/utils/findFirstShiftDate'

export const StepButtons = () => {
  const { prevStep, nextStep } = useFormNavigation()
  const { form } = useContext(FormStateContext)
  const { setStartDate, setEndDate } = useScheduleDateRange()
  const { closeModal } = useModal()
  const formData = useFormData()
  const { setCurrentDate } = useDate()
  const { startLoading, stopLoading } = useLoading()
  const { setSchedule } = useSchedule()
  const { setLocations } = useLocations()
  const generateSchedule = async () => {
    try {
      if (!form.steps.upload.file) {
        toast.error('Please upload a file', {
          containerId: 'ScheduleModal',
        })
        return
      }
      startLoading('schedule')
      closeModal('isSchedulingModalOpen')
      const startDate = form.steps.settings.startDate
      const endDate = form.steps.settings.endDate
      const formattedStartDate = startDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      const formattedEndDate = endDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      setStartDate(formattedStartDate)
      setEndDate(formattedEndDate)
      const response = await axios.post(
        'https://us-west1-scheduler-418812.cloudfunctions.net/create-schedule',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      if (response.status === 200) {
        const data = response.data.data
        toast.success('Schedule generated successfully', {
          containerId: 'Global',
        })
        setSchedule(data)
        const newLocations = new Set(
          data.employeeView.flatMap(employee =>
            employee.shifts.map(shift => shift.location),
          ),
        )

        setLocations(Array.from(newLocations) as string[])

        const firstShiftDate = findFirstShiftDate(data.employeeView)
        setCurrentDate(firstShiftDate)
      }
    } catch (error) {
      stopLoading('schedule')
      if (error.response) {
        toast.error(`${error.response.data}`, {
          containerId: 'Global',
          className: 'toast-error-message',
          autoClose: false,
          closeOnClick: true,
        })
      } else {
        console.error(error)
        toast.error('An unexpected error occurred', {
          containerId: 'Global',
          autoClose: false,
          closeOnClick: true,
        })
      }
    } finally {
      stopLoading('schedule')
    }
  }

  switch (form.index) {
    case 0:
      return (
        <button className={styles.nextStepButton} onClick={nextStep}>
          Next <Image src={greaterIcon} alt=">" />
        </button>
      )
    case 1:
      return (
        <button className={styles.nextStepButton} onClick={nextStep}>
          Next <Image src={greaterIcon} alt=">" />
        </button>
      )
    case 2:
    case 3:
      return (
        <div className={styles.stepButtons}>
          <button className={styles.prevStepButton} onClick={prevStep}>
            <Image src={lessIcon} alt="<" /> Previous
          </button>
          <button className={styles.nextStepButton} onClick={nextStep}>
            Conditions <Image src={greaterIcon} alt=">" />
          </button>
        </div>
      )
    case 4:
    case 5:
      return (
        <div className={styles.stepButtons}>
          <button className={styles.prevStepButton} onClick={prevStep}>
            <Image src={lessIcon} alt="<" /> Previous
          </button>
          <button
            className={styles.generateScheduleButton}
            onClick={generateSchedule}
          >
            ✨ Generate Schedule <Image src={greaterIcon} alt=">" />
          </button>
        </div>
      )
  }
}
