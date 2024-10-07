import { useContext } from 'react'
import { produce } from 'immer'

import { FormStateContext } from '@/state'

export const useFile = () => {
  const { setForm } = useContext(FormStateContext)

  const handleFileChange = (selectedFile: File) => {
    const allowedExtensions = /(\.xlsx|\.xls|\.csv)$/i
    const allowedMimeTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.oasis.opendocument.spreadsheet',
      'text/csv',
    ]

    if (
      !allowedExtensions.exec(selectedFile.name) &&
      !allowedMimeTypes.includes(selectedFile.type)
    ) {
      alert('Please upload a valid spreadsheet or CSV file.')
      return
    }

    setForm(
      produce(draft => {
        draft.steps.upload.file = selectedFile
      }),
    )
  }

  const handleFileDrop = (selectedFile: File) => {
    setForm(
      produce(draft => {
        draft.steps.upload.file = selectedFile
      }),
    )
  }

  const handleRemoveFile = () => {
    setForm(
      produce(draft => {
        draft.steps.upload.file = null
      }),
    )
  }

  const handleChangeFile = (triggerFileInputClick: () => void) => {
    triggerFileInputClick()
  }

  return {
    handleFileChange,
    handleFileDrop,
    handleRemoveFile,
    handleChangeFile,
  }
}
