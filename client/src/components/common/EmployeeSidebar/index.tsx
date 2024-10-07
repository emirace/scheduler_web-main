import React, { useEffect, useState } from 'react'

import { EmployeeView } from './EmployeeView'

import styles from './EmployeeSidebar.module.scss'

import { EmployeeDetails } from '@/components/EmployeeDetails'
import { EmployeeOverviewModal } from '@/components/modals/EmployeeOverviewModal'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'

export interface EmployeeData {
  id: string
  name: string
  position: string
  totalShifts: number
  totalHours: number
  shifts: string[]
  desiredShifts: string[]
  undesiredShifts: string[]
}

export const EmployeeSidebar = ({ isStats }: { isStats: boolean }) => {
  const { schedule } = useSchedule()
  const { openModal, closeModal, isModalOpen } = useModal()
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([])

  useEffect(() => {
    setEmployeeData(schedule.employeeView)
  }, [schedule])

  const handleEmployeeClick = employee => {
    setSelectedEmployee(employee)
    openModal('isEmployeeOverviewModalOpen')
  }

  if (schedule.employeeView.length === 0) {
    return <div>No employees</div>
  }
  return (
    <div className={styles.wrapperContainer}>
      <div className={styles.emptyContainer} />
      <div className={styles.container}>
        {employeeData?.map((employee, index) => (
          <EmployeeView
            key={index}
            index={index}
            onClick={() => handleEmployeeClick(employee)}
            employee={employee}
            isStats={isStats}
          />
        ))}
      </div>
      {isModalOpen('isEmployeeOverviewModalOpen') && selectedEmployee && (
        <EmployeeOverviewModal
          isOpen={true}
          closeModal={() => closeModal('isEmployeeOverviewModalOpen')}
        >
          <EmployeeDetails employee={selectedEmployee} />
        </EmployeeOverviewModal>
      )}
    </div>
  )
}
