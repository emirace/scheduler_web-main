import React from 'react'
import Image from 'next/image'

import styles from '../CrewhrContent.module.scss'

interface Step {
  iconSrc: string
  title: string
  description: string
}

interface HowItWorksSectionProps {
  step: Step
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  step,
}) => {
  return (
    <div className={styles.step}>
      <div className={`${styles.flexRowHowItWorks} ${styles.flexCenter}`}>
        <Image src={step.iconSrc} alt="" width={35} height={35} />
        <div className={styles.infoArea}>
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </div>
      </div>
    </div>
  )
}
