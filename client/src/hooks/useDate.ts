import { useStore } from '@/store/useStore'

export const useDate = () => {
  const currentDate = useStore(state => state.currentDate)
  const setCurrentDate = useStore(state => state.setCurrentDate)

  return { currentDate, setCurrentDate }
}
