import { useContext } from 'react'

import { FormStateContext } from '@/state'

export const useFormData = () => {
  const { form } = useContext(FormStateContext)
  const formData = new FormData()

  const startDate = form.steps.settings.startDate
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })

  const endDate = form.steps.settings.endDate
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })

  const capitalizeBoolean = (value: boolean) => {
    return value ? 'True' : 'False'
  }

  formData.append('start_date', formattedStartDate)
  formData.append('end_date', formattedEndDate)
  formData.append(
    'minimize_weekend_shifts_per_employee',
    capitalizeBoolean(form.steps.conditions.spreadShiftsEvenly),
  )
  formData.append(
    'minimize_weekend_shifts_within_single_weekend_per_employee',
    capitalizeBoolean(form.steps.conditions.limitWorkFullWeekends),
  )
  formData.append(
    'set_max_consecutive_days_in_a_row',
    capitalizeBoolean(form.steps.conditions.maxConsecutiveWorkingDays),
  )
  formData.append(
    'max_consecutive_days',
    String(form.steps.conditions.setMaxConsecutiveWorkingDays),
  )
  formData.append(
    'at_least_two_consecutive_days',
    capitalizeBoolean(form.steps.conditions.atLeastTwoConsecutiveWorkingDays),
  )
  formData.append(
    'minimize_number_of_weekends_with_at_least_one_shift',
    capitalizeBoolean(
      form.steps.conditions
        .minimizeNumOfWeekendsWithAtLeastOneShiftEachEmployee,
    ),
  )
  formData.append(
    'equalize_average_shift_duration',
    capitalizeBoolean(
      form.steps.conditions.equalizeAverageShiftDurationForEachEmployee,
    ),
  )
  formData.append(
    'distribute_shifts_equally_among_employees',
    capitalizeBoolean(
      form.steps.conditions.distributeShiftsEquallyAmongEmployees,
    ),
  )
  formData.append('file', form.steps.upload.file as File)
  formData.append('time_limit_seconds', 'default')
  formData.append(
    'limit_working_in_consecutive_weekends',
    capitalizeBoolean(form.steps.conditions.limitWorkInConsecutiveWeeks),
  )

  const daysOff = Object.keys(form.steps.settings.daysClosed).filter(
    day => form.steps.settings.daysClosed[day],
  )
  daysOff.forEach(day => {
    formData.append('weekdays_off', day)
  })

  return formData
}
