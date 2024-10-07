import React from 'react'
import Image from 'next/image'

import styles from './EmployeeForm.module.scss'

import plusIcon from '@public/plus-icon-dark.svg'

interface EmployeeFormProps {
  fullName: string
  setFullName: (name: string) => void
  role: string
  setRole: (role: string) => void
  addEmployee: (employee: { fullName: string; role: string }) => void
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  fullName,
  setFullName,
  role,
  setRole,
  addEmployee,
}) => {
  const handleSubmit = () => {
    if (fullName && role) {
      addEmployee({ fullName, role })
      setFullName('')
      setRole('')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>Full Name</p>
        <input
          name="fullName"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Enter Full Name"
        />
      </div>
      <div className={styles.inputContainer}>
        <p>Role</p>
        <input
          name="role"
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="Enter Role"
        />
      </div>
      <button type="button" className={styles.button} onClick={handleSubmit}>
        <Image src={plusIcon} alt="+" width={12} height={12} />
      </button>
    </div>
  )
}
