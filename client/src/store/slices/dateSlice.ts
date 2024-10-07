import { StateCreator } from 'zustand'

export type DateSliceT = {
  currentDate: Date
  view: 'monthly' | 'weekly' | 'daily'
  setCurrentDate: (date: Date) => void
  setView: (view: 'monthly' | 'weekly' | 'daily') => void
}

export const dateSlice: StateCreator<DateSliceT> = set => ({
  currentDate: new Date(),
  view: 'monthly',
  setCurrentDate: date => set(() => ({ currentDate: date })),
  setView: view => set(() => ({ view })),
})
