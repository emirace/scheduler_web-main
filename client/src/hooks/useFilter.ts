import { useStore } from '@/store/useStore'

export const useFilter = () => {
  const filters = useStore(state => state.filters)
  const setFilter = useStore(state => state.setFilter)
  const clearFilters = useStore(state => state.clearFilters)

  return { filters, setFilter, clearFilters }
}
