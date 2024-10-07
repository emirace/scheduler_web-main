import React from 'react'

import styles from '../CrewhrContent.module.scss'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faq: FAQ
  index: number
  expandedIndex: number | null
  setExpandedIndex: (index: number | null) => void
}

export const FAQSection = ({
  faq,
  index,
  expandedIndex,
  setExpandedIndex,
}: FAQSectionProps) => {
  const isActive = expandedIndex === index

  const handleToggle = () => {
    setExpandedIndex(isActive ? null : index)
  }

  return (
    <div className={`${styles.faq} ${isActive ? styles.active : ''}`}>
      <h3 onClick={handleToggle}>
        {faq.question}
        <span className={styles.toggleIcon}>{isActive ? '-' : '+'}</span>
      </h3>
      <p>{faq.answer}</p>
    </div>
  )
}
