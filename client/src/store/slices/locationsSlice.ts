import { StateCreator } from 'zustand'

export type LocationsStateT = {
  locations: string[]
  setLocations: (newLocations: string[]) => void
  updateLocations: () => void
}

export const locationsSlice: StateCreator<LocationsStateT | any> = (
  set,
  get,
) => ({
  locations: [],
  setLocations: newLocations => set({ locations: newLocations }),
  updateLocations: () => {
    const currentSchedule = get().schedule
    const newLocationsSet = new Set<string>()

    currentSchedule.employeeView.forEach(employee => {
      employee.shifts.forEach(shift => {
        newLocationsSet.add(shift.location)
      })
    })

    const newLocations = Array.from(newLocationsSet)
    const oldLocations = get().locations

    if (!arraysEqual(newLocations, oldLocations)) {
      set({ locations: newLocations })
    }
  },
})

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}
