import React from 'react'

import styles from './ScheduleStatsPage.module.scss'

import { Header } from '@/components/Header/Header'
import { Stats } from '@/components/Stats'

export default function ScheduleStatsPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Header />
          <Stats />
        </div>
      </div>
    </>
  )
}
