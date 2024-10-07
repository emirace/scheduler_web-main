import React from 'react'
import Select, { components } from 'react-select'
import Image from 'next/image'

import { DropdownStyles } from './dropdownStyles'

import styles from './EmployeeSelect.module.scss'

import dropdownIcon from '@public/dropdown.svg'

import { useSchedule } from '@/hooks/useSchedule'
import { useShiftFormContext } from '@/state/shift'

const nonClickableControlStyles = {
  ...DropdownStyles,
  control: (base, state) => ({
    ...DropdownStyles.control(base, state),
    cursor: 'default',
  }),
}

export const EmployeeSelect = () => {
  const { formData, updateFormData, isAddFromCell, errors } =
    useShiftFormContext()
  const { schedule } = useSchedule()

  const options =
    schedule?.employeeView.map(employee => ({
      value: employee.id,
      label: employee.name,
    })) || []

  const CustomControl = props => {
    return (
      <components.Control
        {...props}
        innerProps={{
          ...props.innerProps,
          onMouseDown: event => event.preventDefault(),
        }}
      />
    )
  }

  const handleChange = selectedOption => {
    if (selectedOption) {
      updateFormData({
        employeeName: selectedOption.label,
        employeeId: selectedOption.value,
      })
    } else {
      // Reset the values if needed
      updateFormData({
        employeeName: '',
        employeeId: '',
      })
    }
  }

  const selectedValue = options.find(
    option => option.value === formData.employeeId,
  )

  const getSelectComponents = () => {
    if (isAddFromCell) {
      return {
        Control: CustomControl,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }
    } else {
      return {
        DropdownIndicator: () => (
          <div className={styles.dropdownIndicator}>
            <Image src={dropdownIcon} alt="dropdown" />
          </div>
        ),
        IndicatorSeparator: () => null,
      }
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.description}>Employee</p>
      <Select
        options={options}
        value={selectedValue}
        styles={isAddFromCell ? nonClickableControlStyles : DropdownStyles}
        onChange={handleChange}
        components={getSelectComponents()}
        isSearchable={!isAddFromCell}
      />
      {errors.employeeName && (
        <p className="error-message">{errors.employeeName}</p>
      )}
    </div>
  )
}
