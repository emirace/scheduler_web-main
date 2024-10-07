import { useStore } from '@/store/useStore'

export const useSchedule = () => {
  const { schedule, setSchedule, scheduleName, setScheduleName } = useStore(
    state => ({
      schedule: state.schedule,
      setSchedule: state.setSchedule,
      scheduleName: state.scheduleName,
      setScheduleName: state.setScheduleName,
    }),
  )

  const removeEmployee = (id: string) => {
    const updatedEmployeeView = schedule.employeeView.filter(
      employee => employee.id !== id,
    )
    setSchedule({ ...schedule, employeeView: updatedEmployeeView })
  }

  const editEmployee = (
    id: string,
    updatedData: { name?: string; position?: string },
  ) => {
    const updatedEmployeeView = schedule.employeeView.map(employee => {
      if (employee.id === id) {
        return {
          ...employee,
          name:
            updatedData.name !== undefined && updatedData.name !== ''
              ? updatedData.name
              : employee.name,
          position:
            updatedData.position !== undefined
              ? updatedData.position
              : employee.position,
        }
      }
      return employee
    })
    setSchedule({ ...schedule, employeeView: updatedEmployeeView })
  }
  return {
    schedule,
    setSchedule,
    scheduleName,
    setScheduleName,
    removeEmployee,
    editEmployee,
  }
}
