import { StateCreator } from 'zustand'

export type ScheduleDataType = {
  employeeView: Array<{
    id: string
    name: string
    position: string
    totalShifts: number
    totalHours: number
    shifts: any[]
    desiredShifts: string[]
    undesiredShifts: string[]
  }>
  shiftHours?: any
  desiredShiftsInfo?: any
}

export type ScheduleSliceT = {
  schedule: ScheduleDataType
  scheduleName: string
  setSchedule: (schedule: ScheduleDataType) => void
  setScheduleName: (name: string) => void
}

export const defaultEmployees = Array.from({ length: 4 }, (_, index) => ({
  id: String(index + 1),
  name: `${String.fromCharCode(65 + index)} Employee`,
  position: 'Position',
  totalShifts: 0,
  totalHours: 0,
  shifts: [],
  desiredShifts: [],
  undesiredShifts: [],
}))

export const scheduleSlice: StateCreator<ScheduleSliceT> = set => ({
  schedule: { employeeView: defaultEmployees },
  scheduleName: 'My Schedule',
  setSchedule: newSchedule => set(() => ({ schedule: newSchedule })),
  setScheduleName: name => set(() => ({ scheduleName: name })),
})
