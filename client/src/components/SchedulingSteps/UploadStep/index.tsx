import React from 'react'

import { UploadDescription } from './UploadDescription'
import { UploadFile } from './UploadFile'

import { StepButtons } from '@/components/common/StepButtons'

export const UploadStep = () => {
  return (
    <div className="upload-step step-inner">
      <UploadDescription />
      <UploadFile />
      <StepButtons />
    </div>
  )
}
