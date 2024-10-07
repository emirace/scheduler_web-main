import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { EmployeeForm } from './EmployeeForm'
import { EmployeeInfo } from './EmployeeInfo'

import styles from './AddEmployee.module.scss'

import { EmployeeData } from '@/components/common/EmployeeSidebar'
import { useModal } from '@/hooks/useModal'
import { useSchedule } from '@/hooks/useSchedule'

export const AddEmployee = () => {
  const { closeModal } = useModal()
  const { schedule, setSchedule } = useSchedule()
  const [employees, setEmployees] = useState<EmployeeData[]>([])

  const addEmployee = (employee: { fullName: string; role: string }) => {
    const newEmployee: EmployeeData = {
      id: uuidv4(),
      name: employee.fullName,
      position: employee.role,
      totalShifts: 0,
      totalHours: 0,
      shifts: [],
      desiredShifts: [],
      undesiredShifts: [],
    }

    setEmployees(prev => [...prev, newEmployee])
  }

  const removeEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedSchedule = {
      ...schedule,
      employeeView: [...schedule.employeeView, ...employees],
    }
    setSchedule(updatedSchedule)
    closeModal('isAddEmployeeModalOpen')
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <EmployeeForm addEmployee={addEmployee} />
        {employees.map(employee => (
          <EmployeeInfo employee={employee} removeEmployee={removeEmployee} />
        ))}
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
    </div>
  )
}
