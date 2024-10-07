import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

import styles from './ScheduleTitle.module.scss'

import { useSchedule } from '@/hooks/useSchedule'

export const ScheduleTitle = () => {
  const { scheduleName, setScheduleName } = useSchedule()
  const [editName, setEditName] = useState(scheduleName)

  useEffect(() => {
    setEditName(scheduleName)
  }, [scheduleName])

  const debouncedSetScheduleName = useCallback(
    debounce(name => {
      setScheduleName(name)
    }, 300),
    [],
  )

  const handleChange = event => {
    const newName = event.target.value
    setEditName(newName)
    debouncedSetScheduleName(newName)
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={editName}
        onChange={handleChange}
        className={styles.titleInput}
      />
    </div>
  )
}
