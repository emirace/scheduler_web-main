export type EmployeeType = {
  shifts: {
    date: string
    hours: string
    location: string
    weekday: string
  }[]
  name: string
  position: string
  totalHours: number
}
