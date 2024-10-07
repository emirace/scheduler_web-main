import React from 'react'

import { InputTableDescription } from './InputTableDescription'
import { InputTableGrid } from './InputTableGrid'

import { StepButtons } from '@/components/common/StepButtons'

export const InputTableStep = () => {
  return (
    <div className="step-inner">
      <InputTableDescription />
      <InputTableGrid />
      <StepButtons />
    </div>
  )
}
