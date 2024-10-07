import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Image from 'next/image'

import styles from './ExportSchedule.module.scss'

import exportIcon from '@public/export-icon.svg'

import { useSchedule } from '@/hooks/useSchedule'
import { useScheduleDateRange } from '@/hooks/useScheduleDateRange'

export const ExportSchedule = () => {
  const { schedule, scheduleName } = useSchedule()
  const { startDate, endDate } = useScheduleDateRange()
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = async () => {
    const hasShifts = schedule.employeeView.some(
      employee => employee.shifts.length > 0,
    )
    if (!hasShifts) {
      toast.error('No shifts available to export', {
        containerId: 'Global',
      })
      return
    }
    setIsLoading(true)
    try {
      const apiUrl =
        'https://us-west1-scheduler-418812.cloudfunctions.net/create-excel'
      const formData = new FormData()
      formData.append('Employee View', JSON.stringify(schedule.employeeView))

      formData.append(
        'desiredShiftsInfo',
        JSON.stringify(schedule.desiredShiftsInfo),
      )

      formData.append('start_date', JSON.stringify(startDate))
      formData.append('end_date', JSON.stringify(endDate))

      formData.append('shiftHours', JSON.stringify(schedule.shiftHours))

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })

      const file = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const fileURL = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = fileURL
      link.setAttribute('download', `${scheduleName}.xlsx`)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      toast.error('Failed to export schedule', {
        containerId: 'Global',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button className={styles.button} onClick={handleExport}>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <Image src={exportIcon} alt="export icon" />
        </>
      )}
    </button>
  )
}
