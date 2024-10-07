import React, { useContext, useEffect, useRef } from 'react'

import { SelectFile } from './SelectFile'
import { UploadedFile } from './UploadedFile'

import { useFile } from '@/hooks/useFile'
import { FormStateContext } from '@/state'

export const UploadFile = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { form } = useContext(FormStateContext)
  const {
    handleFileChange,
    handleFileDrop,
    handleRemoveFile,
    handleChangeFile,
  } = useFile()

  const uploadedFile = form.steps.upload.file

  useEffect(() => {
    if (uploadedFile) {
      if (inputFileRef.current) {
        inputFileRef.current.value = ''
      }
    }
  }, [uploadedFile])
  return (
    <>
      <input
        ref={inputFileRef}
        type="file"
        accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.oasis.opendocument.spreadsheet,text/csv"
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e.target.files[0])
          }
        }}
        style={{ display: 'none' }}
      />
      {uploadedFile ? (
        <UploadedFile
          uploadedFile={uploadedFile}
          handleRemoveFile={handleRemoveFile}
          handleChangeFile={handleChangeFile}
          inputFileRef={inputFileRef}
        />
      ) : (
        <SelectFile
          handleFileDrop={handleFileDrop}
          inputFileRef={inputFileRef}
        />
      )}
    </>
  )
}
