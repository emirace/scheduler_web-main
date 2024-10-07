import React from 'react'
import Select from 'react-select'
import Image from 'next/image'

import { DropdownStyles } from './dropdownStyles'

import styles from './GenerationMode.module.scss'

import dropdownIcon from '@public/dropdown.svg'

export const GenerationMode = () => {
  return (
    <div className={styles.container}>
      <h2>Schedule generation mode:</h2>
      <p className={styles.description}>
        The longer the duration, the more schedule options the AI will try.
      </p>
      <Select
        options={[
          { value: 'default', label: 'Default (fastest)' },
          { value: 'fast', label: 'Fast' },
          { value: 'slow', label: 'Slow' },
        ]}
        styles={DropdownStyles}
        components={{
          DropdownIndicator: () => {
            return (
              <div className={styles.dropdownIndicator}>
                <Image src={dropdownIcon} alt="dropdown" />
              </div>
            )
          },
          IndicatorSeparator: () => null,
        }}
        isSearchable={false}
        defaultValue={{ value: 'default', label: 'Default (fastest)' }}
      />
    </div>
  )
}
