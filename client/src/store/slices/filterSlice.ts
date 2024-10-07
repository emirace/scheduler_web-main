import { StateCreator } from 'zustand'

export type FilterStateT = {
  filters: {
    location: string | null
    employee: string | null
  }
  setFilter: (
    filterType: keyof FilterStateT['filters'],
    value: string | null,
  ) => void
  clearFilters: () => void
}

export const filterSlice: StateCreator<FilterStateT> = set => ({
  filters: { location: null, employee: null },
  setFilter: (filterType, value) =>
    set(state => {
      return {
        filters: { ...state.filters, [filterType]: value },
      }
    }),
  clearFilters: () => set({ filters: { location: null, employee: null } }),
})
