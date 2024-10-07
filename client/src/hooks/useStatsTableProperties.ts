import { useEffect, useState } from 'react'

import { useLocations } from './useLocations'

export const useStatsTableProperties = () => {
  const [properties, setProperties] = useState<string[]>([])
  const { locations } = useLocations()
  useEffect(() => {
    const locationProperties = locations.map(
      location => `Location: ${location}`,
    )
    setProperties([
      'Total shifts',
      'Total hours',
      ...locationProperties,
      'Total weekend shifts',
      'Separate weekends with one shift',
      'Desired shift requests',
      'Fulfilled desired shift requests',
      'Undesired shift requests',
      'Fulfilled undesired shift requests',
    ])
  }, [locations])

  return properties
}
