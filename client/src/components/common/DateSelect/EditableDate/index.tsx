import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import Image from 'next/image'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './EditableDate.module.scss'

import dropdownIcon from '@public/dropdown.svg'

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button className={styles.dateButton} onClick={onClick} ref={ref}>
    {value}
    <Image src={dropdownIcon} alt="dropdown" />
  </button>
))

export const EditableDate = ({ selectedDate, onChange }) => (
  <DatePicker
    selected={selectedDate}
    wrapperClassName={styles.datepickerWrapper}
    customInput={<ExampleCustomInput />}
    enableTabLoop={false}
    dateFormat={'EEEE, d MMMM, yyyy'}
    onChange={onChange}
  />
)
