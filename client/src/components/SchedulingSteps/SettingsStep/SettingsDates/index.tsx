import React, { forwardRef, useContext } from 'react'
import DatePicker from 'react-datepicker'
import { produce } from 'immer'
import Image from 'next/image'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './SettingsDates.module.scss'

import dropdownIcon from '@public/dropdown.svg'

import { useScheduleDateRange } from '@/hooks/useScheduleDateRange'
import { FormStateContext } from '@/state'

export const SettingsDates = () => {
  const { form, setForm } = useContext(FormStateContext)
  const { setStartDate, setEndDate } = useScheduleDateRange()
  const startDate = form.steps.settings.startDate
  const endDate = form.steps.settings.endDate

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button className={styles.dateButton} onClick={onClick} ref={ref}>
      {value}
      <Image src={dropdownIcon} alt="dropdown" />
    </button>
  ))
  return (
    <div className={styles.container}>
      <div>
        <h2>Dates</h2>
        <p>What dates did you want to create a schedule for?</p>
      </div>
      <div className={styles.dateButtonsContainer}>
        <div className={styles.dateWrapper}>
          <p>Start Date:</p>
          <DatePicker
            selected={startDate}
            wrapperClassName={styles.datepickerWrapper}
            customInput={<ExampleCustomInput />}
            enableTabLoop={false}
            dateFormat={'EEEE, d MMMM, yyyy'}
            onChange={(date: any) => {
              setForm(
                produce(draft => {
                  draft.steps.settings.startDate = date
                }),
              )
              const formattedStartDate = date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })
              setStartDate(formattedStartDate)
            }}
          />
        </div>
        <div className={styles.dateWrapper}>
          <p>End Date:</p>
          <DatePicker
            selected={endDate}
            wrapperClassName={styles.datepickerWrapper}
            dateFormat={'EEEE, d MMMM, yyyy'}
            customInput={<ExampleCustomInput />}
            enableTabLoop={false}
            onChange={(date: any) => {
              setForm(
                produce(draft => {
                  draft.steps.settings.endDate = date
                }),
              )
              const formattedEndDate = date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })
              setEndDate(formattedEndDate)
            }}
          />
        </div>
      </div>
    </div>
  )
}
