import React from 'react'

import { ScheduleTitle } from '../ScheduleTitle'
import { AddEmployeeHeader } from './AddEmployeeHeader'
import { AddShiftHeader } from './AddShiftHeader'
import CalendarFilter from './CalendarFilter'
import { CalendarNavigation } from './CalendarNavigation'
import { CalendarView } from './CalendarView'
import { ClearSchedule } from './ClearSchedule'
import { ExportSchedule } from './ExportSchedule'
import { ScheduleStats } from './ScheduleStats'
import { StartScheduling } from './StartScheduling'

import styles from './CalendarHeaderActions.module.scss'

export const CalendarHeaderActions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <CalendarNavigation />
        <CalendarView />
        <CalendarFilter />
        <ScheduleTitle />
      </div>
      <div className={styles.rightButtons}>
        <StartScheduling />
        <AddEmployeeHeader />
        <AddShiftHeader />
        <ScheduleStats />
        <ClearSchedule />
        <ExportSchedule />
      </div>
    </div>
  )
}
