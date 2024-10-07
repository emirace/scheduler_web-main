import { EmployeeType } from './EmployeeType'

export type ShiftType = {
  day: Date
  employee: EmployeeType
  shiftData: any | null
}
