import { useStore } from '@/store/useStore'

export const useHydration = () => {
  const hasHydrated = useStore(state => state.hasHydrated)

  return { hasHydrated }
}
