// EmployeeForm.js
import React, { useState } from 'react'
import Image from 'next/image'

import styles from './EmployeeForm.module.scss'

import plusIcon from '@public/plus-icon-dark.svg'

interface EmployeeFormProps {
  addEmployee: (employee: { fullName: string; role: string }) => void
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ addEmployee }) => {
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = () => {
    if (fullName && role) {
      addEmployee({ fullName, role })
      setFullName('')
      setRole('')
    }
  }

  return (
    <div className={styles.container}>
      <input
        name="fullName"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        name="role"
        value={role}
        onChange={e => setRole(e.target.value)}
        placeholder="Role"
      />
      <button type="button" className={styles.button} onClick={handleSubmit}>
        <Image src={plusIcon} alt="+" width={12} height={12} />
      </button>
    </div>
  )
}
