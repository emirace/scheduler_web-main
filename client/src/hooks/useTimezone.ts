import { useEffect, useState } from 'react'

const useTimezone = (): string => {
  const [userTimezone, setUserTimezone] = useState<string>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      setUserTimezone(timezone)
    }
  }, [])

  return userTimezone as string
}

export default useTimezone
