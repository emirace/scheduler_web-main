import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './GoBack.module.scss'

import arrowLeft from '@public/arrow-left.png'

export const GoBack = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.push('/')
  }
  return (
    <div className={styles.container} onClick={handleGoBack}>
      <Image src={arrowLeft} alt="Go back" width={10} height={13} />
      <p>Back</p>
    </div>
  )
}
