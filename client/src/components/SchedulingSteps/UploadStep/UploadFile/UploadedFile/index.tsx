import React from 'react'
import Image from 'next/image'

import styles from './UploadedFile.module.scss'

import fileIcon from '@public/file-icon.svg'
import thrashIcon from '@public/thrash-icon.svg'

type Props = {
  uploadedFile: File
  handleRemoveFile: () => void
  handleChangeFile: (callback: () => void) => void
  inputFileRef: React.RefObject<HTMLInputElement>
}

export const UploadedFile = ({
  uploadedFile,
  handleRemoveFile,
  handleChangeFile,
  inputFileRef,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.fileCard}>
          <div className={styles.fileWrapper}>
            <Image src={fileIcon} alt="icon" />
            <p>{uploadedFile.name}</p>
          </div>
          <button className={styles.removeButton} onClick={handleRemoveFile}>
            <Image src={thrashIcon} alt="Remove" />
          </button>
        </div>
        <button
          className={styles.changeFile}
          onClick={() => handleChangeFile(() => inputFileRef?.current?.click())}
        >
          Change file
        </button>
      </div>
    </div>
  )
}
