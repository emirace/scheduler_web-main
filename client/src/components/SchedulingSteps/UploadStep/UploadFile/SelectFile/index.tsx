import React from 'react'

import styles from './SelectFile.module.scss'

import { UploadIcon } from '@/ui/upload-icon'

type Props = {
  handleFileDrop: (file: File) => void
  inputFileRef: React.RefObject<HTMLInputElement>
}

export const SelectFile = ({ handleFileDrop, inputFileRef }: Props) => {
  return (
    <div
      className={styles.container}
      onDrop={e => {
        e.preventDefault()
        handleFileDrop(e.dataTransfer.files[0])
      }}
      onDragOver={e => e.preventDefault()}
    >
      <UploadIcon />
      <p className={styles.selectDescription}>
        Drag & drop files here, or
        <button onClick={() => inputFileRef.current?.click()}>
          choose file
        </button>
      </p>
      <p className={styles.selectLimit}>Size limit: 10MB</p>
    </div>
  )
}
