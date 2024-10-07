import React from 'react'

import { EmployeeSidebar } from '../common/EmployeeSidebar'
import GettingStartedPopup from '../GettingStartedPopup'
import { Loading } from '../Loading'
import { CalendarHeaderDays } from './CalendarHeader/CalendarHeaderDays'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'

import styles from './Calendar.module.scss'

import { useHydration } from '@/hooks/useHydration'
import { useIsGettingStarted } from '@/hooks/useIsGettingStarted'
import { useLoading } from '@/hooks/useLoading'

export const Calendar = () => {
  const { hasHydrated } = useHydration()
  const { loadingStates } = useLoading()
  const { isGettingStartedClosed, closeGettingStarted } = useIsGettingStarted()
  switch (hasHydrated) {
    case false:
      return <Loading hasDescription={false} />
    case true: {
      const isScheduleLoading = loadingStates['schedule']
      return (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <CalendarHeader />
            <div className={styles.calendarGridWithSidebar}>
              <EmployeeSidebar isStats={false} />
              <div className={styles.gridWrapper}>
                <CalendarHeaderDays />
                {isScheduleLoading ? (
                  <Loading hasDescription={true} />
                ) : (
                  <CalendarGrid />
                )}
              </div>
            </div>
          </div>
          {!isGettingStartedClosed && (
            <GettingStartedPopup onClose={closeGettingStarted} />
          )}
        </div>
      )
    }
  }
}
