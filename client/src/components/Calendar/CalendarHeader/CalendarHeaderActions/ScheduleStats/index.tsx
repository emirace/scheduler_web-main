import React from 'react'
import Link from 'next/link'

import styles from './ScheduleStats.module.scss'

export const ScheduleStats = () => {
  return (
    <>
      <Link href="/stats" className={styles.button}>
        Stats
      </Link>
    </>
  )
}
