import { useMemo } from 'react'

import { useStore } from '@/store/useStore'

export const useLocations = () => {
  const locations = useStore(state => state.locations)
  const setLocations = useStore(state => state.setLocations)
  const updateLocations = useStore(state => state.updateLocations)

  const locationOptions = useMemo(
    () =>
      locations.map(location => ({
        value: location,
        label: location,
      })),
    [locations],
  )

  return { locations, setLocations, updateLocations, locationOptions }
}
