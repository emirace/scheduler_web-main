import { createContext, useState } from 'react'

import { Form } from '@/types/FormStateTypes'

const calculateStartAndEndDates = () => {
  const currentDate = new Date()
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1,
  )
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    0,
  )
  return { startDate, endDate }
}

const { startDate, endDate } = calculateStartAndEndDates()

const initialFormState: Form = {
  index: 0,
  steps: {
    upload: {
      file: null,
    },
    settings: {
      startDate,
      endDate,
      daysClosed: {
        Sunday: true,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: true,
      },
      mode: 'default',
    },
    conditions: {
      atLeastTwoConsecutiveWorkingDays: true,
      maxConsecutiveWorkingDays: true,
      setMaxConsecutiveWorkingDays: 5,
      spreadShiftsEvenly: false,
      limitWorkInConsecutiveWeeks: false,
      limitWorkFullWeekends: false,
      minimizeNumOfWeekendsWithAtLeastOneShiftEachEmployee: false,
      equalizeAverageShiftDurationForEachEmployee: false,
      distributeShiftsEquallyAmongEmployees: true,
    },
  },
}

export const FormStateContext = createContext<{
  form: Form
  setForm: React.Dispatch<React.SetStateAction<Form>>
}>({
  form: initialFormState,
  setForm: () => {},
})

type FormStateProviderProps = {
  children: React.ReactNode
}

export const FormStateProvider: React.FC<FormStateProviderProps> = ({
  children,
}: FormStateProviderProps) => {
  const [form, setForm] = useState(initialFormState)

  return (
    <FormStateContext.Provider value={{ form, setForm }}>
      {children}
    </FormStateContext.Provider>
  )
}
