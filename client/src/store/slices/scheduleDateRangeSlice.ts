import { StateCreator } from 'zustand'

export type ScheduleDateRangeSliceT = {
  startDate: string
  endDate: string
  setStartDate: (startDate: string) => void
  setEndDate: (endDate: string) => void
}

export const scheduleDateRangeSlice: StateCreator<
  ScheduleDateRangeSliceT
> = set => ({
  startDate: '',
  endDate: '',
  setStartDate: startDate => set({ startDate: startDate }),
  setEndDate: endDate => set({ endDate: endDate }),
})
