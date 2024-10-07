import { DaysClosed, ScheduleGenerationMode } from './Enums'

export interface Form {
  index: number
  steps: {
    upload: {
      file: File | null
    }
    settings: {
      startDate: Date
      endDate: Date
      daysClosed: DaysClosed
      mode: ScheduleGenerationMode
    }
    conditions: {
      atLeastTwoConsecutiveWorkingDays: boolean
      maxConsecutiveWorkingDays: boolean
      setMaxConsecutiveWorkingDays?: number
      spreadShiftsEvenly: boolean
      limitWorkInConsecutiveWeeks: boolean
      limitWorkFullWeekends: boolean
      minimizeNumOfWeekendsWithAtLeastOneShiftEachEmployee: boolean
      equalizeAverageShiftDurationForEachEmployee: boolean
      distributeShiftsEquallyAmongEmployees: boolean
    }
  }
}

export interface FinalizedForm {
  startDate: string
  endDate: string
  daysClosed: string[]
  mode: ScheduleGenerationMode
  atLeastTwoConsecutiveWorkingDays: boolean
  maxConsecutiveWorkingDays: boolean
  setMaxConsecutiveWorkingDays?: number
  spreadShiftsEvenly: boolean
  limitWorkInConsecutiveWeeks: boolean
  limitWorkFullWeekends: boolean
  minimizeNumOfWeekendsWithAtLeastOneShiftEachEmployee: boolean
  equalizeAverageShiftDurationForEachEmployee: boolean
  distributeShiftsEquallyAmongEmployees: boolean
  file: File
}
