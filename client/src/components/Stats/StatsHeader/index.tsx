import React from 'react'

import { GoBack } from './GoBack'
import { Title } from './Title'

import styles from './StatsHeader.module.scss'

export const StatsHeader = () => {
  return (
    <div className={styles.container}>
      <Title />
      <GoBack />
    </div>
  )
}
