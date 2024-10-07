export const findFirstShiftDate = employeeView => {
  const dates = employeeView
    ?.flatMap(employee => employee.shifts?.map(shift => new Date(shift.date)))
    .filter(Boolean)

  if (dates.length === 0) {
    return new Date()
  }

  return new Date(Math.min(...dates))
}
