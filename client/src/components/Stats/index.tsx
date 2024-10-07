import React from 'react'

import { EmployeeSidebar } from '../common/EmployeeSidebar'
import { Loading } from '../Loading'
import { StatsTableHeader } from './StatsHeader/StatsTableHeader'
import { StatsGrid } from './StatsGrid'
import { StatsHeader } from './StatsHeader'

import styles from './Stats.module.scss'

import { useHydration } from '@/hooks/useHydration'
import { useLoading } from '@/hooks/useLoading'

export const Stats = () => {
  const { hasHydrated } = useHydration()
  const { loadingStates } = useLoading()
  switch (hasHydrated) {
    case false:
      return <Loading hasDescription={false} />
    case true: {
      const isScheduleLoading = loadingStates['schedule']
      return (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <StatsHeader />
            <div className={styles.calendarGridWithSidebar}>
              <EmployeeSidebar isStats={true} />
              <div className={styles.gridWrapper}>
                <StatsTableHeader />
                {isScheduleLoading ? (
                  <Loading hasDescription={true} />
                ) : (
                  <StatsGrid />
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
