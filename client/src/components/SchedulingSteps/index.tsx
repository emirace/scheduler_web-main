import React, { useContext } from 'react'

import { ConditionsStep } from './ConditionsStep'
import { InputTableStep } from './InputTableStep'
import { SettingsStep } from './SettingsStep'
import { UploadStep } from './UploadStep'

import { FormStateContext } from '@/state/form'

export const SchedulingSteps = () => {
  const { form } = useContext(FormStateContext)

  switch (form.index) {
    case 0:
      return <UploadStep />
    case 1:
      return <InputTableStep />
    case 2:
    case 3:
      return <SettingsStep />
    case 4:
    case 5:
      return <ConditionsStep />
    default:
      return null
  }
}
