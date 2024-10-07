import React from 'react'

import styles from './EmployeeHeading.module.scss'

export const EmployeeHeading = ({
  onNameChange,
  onRoleChange,
  fullName,
  role,
}: {
  fullName: string
  role: string
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRoleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.fullName}>
        <p>Full Name</p>
        <input
          type="text"
          value={fullName}
          onChange={onNameChange}
          className={styles.input}
        />
      </div>
      <div className={styles.role}>
        <p>Role</p>
        <input
          type="text"
          value={role}
          onChange={onRoleChange}
          className={styles.input}
        />
      </div>
    </div>
  )
}
