import React from 'react'

import styles from './StatsTableHeader.module.scss'

import { useStatsTableProperties } from '@/hooks/useStatsTableProperties'

export const StatsTableHeader = () => {
  const properties = useStatsTableProperties()

  return (
    <div className={styles.container}>
      {properties.map(property => (
        <div key={property} className={styles.dayHeader}>
          <p>{property}</p>
        </div>
      ))}
    </div>
  )
}
