import { StateCreator } from 'zustand'

export type GettingStartedStateT = {
  isGettingStartedClosed: boolean
  setGettingStartedClosed: (closed: boolean) => void
}

export const gettingStartedSlice: StateCreator<GettingStartedStateT> = set => ({
  isGettingStartedClosed: false,
  setGettingStartedClosed: closed => set({ isGettingStartedClosed: closed }),
})
