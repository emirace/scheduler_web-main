import { useStore } from '@/store/useStore'

export const useView = () => {
  const view = useStore(state => state.view)
  const setView = useStore(state => state.setView)
  return { view, setView }
}
