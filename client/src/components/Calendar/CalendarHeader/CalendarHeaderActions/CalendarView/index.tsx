import React, { useCallback } from 'react'
import Select from 'react-select'
import Image from 'next/image'

import dropdownIcon from '@public/dropdown-icon.svg'

import { useView } from '@/hooks/useView'
import { getCustomStyles } from '@/utils/selectCustomStyles'

const options = [
  { value: 'monthly', label: 'Month' },
  { value: 'weekly', label: 'Week' },
  { value: 'daily', label: 'Day' },
]

export const CalendarView = () => {
  const { setView } = useView()

  const updateView = useCallback(
    selectedOption => {
      setView(selectedOption.value)
    },
    [setView],
  )

  const customStyles = getCustomStyles(false)

  return (
    <Select
      defaultValue={options[0]}
      options={options}
      onChange={updateView}
      styles={customStyles}
      instanceId={'calendar-view'}
      components={{
        IndicatorSeparator: () => null,
        // add custom dropdown indicator
        DropdownIndicator: () => (
          <Image src={dropdownIcon} alt="v" width={10} />
        ),
      }}
    />
  )
}
