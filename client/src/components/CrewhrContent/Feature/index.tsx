import React from 'react'
import Image from 'next/image'

import styles from '../CrewhrContent.module.scss'

interface FeatureProps {
  iconSrc: string
  title: string
  description: string
}

export const Feature: React.FC<FeatureProps> = ({
  iconSrc,
  title,
  description,
}) => {
  return (
    <div className={styles.feature}>
      <div className={styles.flexBox}>
        <div className={styles.flexRow}>
          <span className={styles.icon}>
            <Image src={iconSrc} alt="" width={32} height={32} />
          </span>
          <h2>{title}</h2>
        </div>
      </div>
      <p>{description}</p>
    </div>
  )
}
