import React, { memo, useEffect, useState } from 'react'
import Select, { components } from 'react-select'
import Image from 'next/image'

import styles from './CalendarFilter.module.scss'

import filterIcon from '@public/filter-icon.svg'

import { useFilter } from '@/hooks/useFilter'
import { useLocations } from '@/hooks/useLocations'
import { getCustomStyles } from '@/utils/selectCustomStyles'

const Option = props => {
  if (props.data.type === 'title') {
    return (
      <components.Option {...props} className={styles.dropdownTitle} isDisabled>
        <p className={styles.label}>{props.data.label}</p>
      </components.Option>
    )
  }
  return <components.Option {...props} />
}

const CalendarFilter = memo(() => {
  const { filters, setFilter, clearFilters } = useFilter()
  const { locationOptions } = useLocations()

  const optionsWithTitles = [
    { value: 'location', label: 'LOCATION', type: 'title' },
    ...locationOptions,
  ]

  const [selectedOption, setSelectedOption] = useState(() => {
    return (
      locationOptions.find(option => option.value === filters.location) || null
    )
  })

  useEffect(() => {
    const newSelectedOption = locationOptions.find(
      option => option.value === filters.location,
    )
    setSelectedOption(newSelectedOption || null)
  }, [filters.location, locationOptions])

  const handleLocationChange = selectedOption => {
    if (selectedOption && selectedOption.value !== 'location') {
      setSelectedOption(selectedOption)
      setFilter('location', selectedOption.value)
    } else {
      handleClearFilters()
    }
  }

  const handleClearFilters = () => {
    setSelectedOption(null)
    clearFilters()
  }

  const isSelectDisabled = locationOptions.length === 0

  const customStyles = getCustomStyles(isSelectDisabled)

  return (
    <>
      <Select
        options={optionsWithTitles}
        onChange={handleLocationChange}
        value={selectedOption}
        components={{
          Option,
          IndicatorSeparator: null,
          DropdownIndicator: () => (
            <Image src={filterIcon} alt="filter" width={16} />
          ),
        }}
        placeholder="Filter"
        styles={customStyles}
        classNamePrefix="react-select"
        isOptionDisabled={option => option.type === 'title'}
        isDisabled={isSelectDisabled}
      />
      {selectedOption && (
        <button onClick={handleClearFilters} className={styles.clearFilters}>
          Clear Filter
        </button>
      )}
    </>
  )
})

export default CalendarFilter
