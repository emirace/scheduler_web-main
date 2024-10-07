export const groupedConditions = [
  {
    label: 'Consecutive Working days',
    conditions: [
      {
        id: 'atLeastTwoConsecutiveWorkingDays',
        label: 'Ensure at least two consecutive working days',
        description:
          'This will aim to schedule employees at least two days in a row (to avoid a one day on, one day off scheduling)',
      },
      {
        id: 'maxConsecutiveWorkingDays',
        label: 'Set max consecutive working days',
        description:
          'This will cap the number of consecutive days an employee can be scheduled in a row',
      },
    ],
  },
  {
    label: 'Weekend Shifts',
    conditions: [
      {
        id: 'spreadShiftsEvenly',
        label: 'Spread the weekend shifts evenly among employees',
        description: 'Spread the weekend shifts evenly among employees',
      },
      {
        id: 'limitWorkInConsecutiveWeeks',
        label: 'Limit working on consecutive weekends',
        description:
          'This will aim to avoid scheduling employees 2 weekends in a row',
      },
      {
        id: 'limitWorkFullWeekends',
        label: 'Limit working the full weekend',
        description:
          'This will aim to schedule an employee for just one day on the weekend, and not the full weekend',
      },
      {
        id: 'minimizeNumOfWeekendsWithAtLeastOneShiftEachEmployee',
        label:
          'Minimize number of weekends with at least one shift for each employee',
        description:
          'This will aim to schedule an employee for a full weekend, instead of just one day on the weekend',
      },
    ],
  },
  {
    label: 'Shift Durations',
    conditions: [
      {
        id: 'equalizeAverageShiftDurationForEachEmployee',
        label: 'Equalize average shift duration for each employee',
        description:
          'This will aim to spread short and long duration days evenly among employees',
      },
      {
        id: 'distributeShiftsEquallyAmongEmployees',
        label: 'Distribute shifts equally among employees',
        description:
          'This will aim to spread the number of shifts evenly among employees',
      },
    ],
  },
]
