import { StateCreator } from 'zustand'

export type LoadingSliceT = {
  loadingStates: { [key: string]: boolean }
  setLoading: (key: string, isLoading: boolean) => void
}

export const loadingSlice: StateCreator<LoadingSliceT> = set => ({
  loadingStates: {},
  setLoading: (key, isLoading) => {
    set(state => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: isLoading,
      },
    }))
  },
})
