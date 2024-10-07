import { useStore } from '@/store/useStore'

export const useIsGettingStarted = () => {
  const isGettingStartedClosed = useStore(state => state.isGettingStartedClosed)
  const setGettingStartedClosed = useStore(
    state => state.setGettingStartedClosed,
  )

  const closeGettingStarted = () => {
    setGettingStartedClosed(true)
  }

  const openGettingStarted = () => {
    setGettingStartedClosed(false)
  }

  return {
    isGettingStartedClosed,
    closeGettingStarted,
    openGettingStarted,
  }
}
