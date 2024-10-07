import { useCallback, useContext } from 'react'

import { FormStateContext } from '@/state/form'

export const useFormNavigation = () => {
  const { setForm } = useContext(FormStateContext)

  const nextStep = useCallback(() => {
    setForm(prev => ({ ...prev, index: prev.index + 2 }))
  }, [setForm])

  const prevStep = useCallback(() => {
    setForm(prev => ({ ...prev, index: prev.index - 2 }))
  }, [setForm])

  return { nextStep, prevStep }
}
