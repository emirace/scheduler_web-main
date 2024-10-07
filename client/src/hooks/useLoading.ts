import { useStore } from '@/store/useStore'

export const useLoading = () => {
  const setLoading = useStore(state => state.setLoading)
  const loadingStates = useStore(state => state.loadingStates)

  const startLoading = key => setLoading(key, true)
  const stopLoading = key => setLoading(key, false)

  return { startLoading, stopLoading, loadingStates }
}
