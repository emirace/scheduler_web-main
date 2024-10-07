import styles from './GridCell.module.scss'

import { EmployeeType } from '@/types/EmployeeType'

export const GridCell = ({
  day,
  employee,
  employeeIndex,
  isShiftPresent,
  shift,
  handleCellClick,
}: {
  day: Date
  employee: EmployeeType
  employeeIndex: number
  isShiftPresent: boolean
  shift: JSX.Element | null
  handleCellClick: (
    day: Date,
    employee: EmployeeType,
    isShiftPresent: boolean,
  ) => void
}) => {
  const buttonText = isShiftPresent ? 'Edit' : 'Add'
  const buttonClass = isShiftPresent
    ? styles.editShiftButton
    : styles.addShiftButton

  return (
    <div
      key={`${day.toISOString()}-${employeeIndex}`}
      className={`${styles.cell} cell`}
    >
      {shift}
      <button
        onClick={() => handleCellClick(day, employee, isShiftPresent)}
        className={`${styles.cellButton} ${buttonClass}`}
      >
        {buttonText}
      </button>
    </div>
  )
}
