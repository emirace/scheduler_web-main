import { useStore } from '@/store/useStore'

export const useScheduleDateRange = () => {
  const startDate = useStore(state => state.startDate)
  const endDate = useStore(state => state.endDate)
  const setStartDate = useStore(state => state.setStartDate)
  const setEndDate = useStore(state => state.setEndDate)

  return { startDate, endDate, setStartDate, setEndDate }
}
