import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
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
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('')

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

    const updatedEmployees = [...employees]

    if (fullName) {
      const newEmployee: EmployeeData = {
        id: uuidv4(),
        name: fullName,
        position: role,
        totalShifts: 0,
        totalHours: 0,
        shifts: [],
        desiredShifts: [],
        undesiredShifts: [],
      }

      updatedEmployees.push(newEmployee)
      setFullName('')
      setRole('')
    } else {
      toast.error('Please fill out Full Name in order to add employee', {
        containerId: 'AddEmployeeModal',
      })
      return
    }

    const updatedSchedule = {
      ...schedule,
      employeeView: [...schedule.employeeView, ...updatedEmployees],
    }
    setSchedule(updatedSchedule)
    closeModal('isAddEmployeeModalOpen')
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <EmployeeForm
          fullName={fullName}
          setFullName={setFullName}
          role={role}
          setRole={setRole}
          addEmployee={addEmployee}
        />
        {employees.map(employee => (
          <EmployeeInfo
            key={employee.id}
            employee={employee}
            removeEmployee={removeEmployee}
          />
        ))}
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
      <ToastContainer position="top-center" containerId={'AddEmployeeModal'} />
    </div>
  )
}
