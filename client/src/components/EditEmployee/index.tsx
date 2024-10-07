import React from 'react'
import { ToastContainer } from 'react-toastify'

import { EmployeeData } from '../common/EmployeeSidebar'
import { EmployeeActionButtons } from './EmployeeActionButtons'
import { EmployeeHeading } from './EmployeeHeading'

import styles from './EditEmployee.module.scss'

export const EditEmployee = ({ employee }: { employee: EmployeeData }) => {
  const [fullName, setFullName] = React.useState(employee.name)
  const [role, setRole] = React.useState(employee.position)

  const handleNameChange = e => {
    setFullName(e.target.value)
  }

  const handleRoleChange = e => {
    setRole(e.target.value)
  }

  return (
    <div className={styles.container} key={employee.id}>
      <EmployeeHeading
        fullName={fullName}
        role={role}
        onNameChange={handleNameChange}
        onRoleChange={handleRoleChange}
      />
      <EmployeeActionButtons
        employee={employee}
        onSave={() => ({ name: fullName, position: role })}
      />
      <ToastContainer containerId="EditEmployeeModal" position="top-center" />
    </div>
  )
}
