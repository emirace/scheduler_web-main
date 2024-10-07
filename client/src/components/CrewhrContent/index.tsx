import React, { useState } from 'react'

import { faqsData, featuresData, howItWorksData } from './data'
import { FAQSection } from './FaqSection'
import { Feature } from './Feature'
import { HowItWorksSection } from './HowItWorksSection'

import styles from './CrewhrContent.module.scss'

const CrewhrContent: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.howItWorks}>
          <h2 className={styles.headingTitleHow}>How It Works</h2>
          <p onClick={openModal} className={styles.watchDemo}>
            Watch this demo video
          </p>
          <div className="steps">
            {howItWorksData.map((step, index) => (
              <HowItWorksSection key={index} step={step} />
            ))}
          </div>
          <hr className={styles.divider} />
        </div>

        <div className={styles.features}>
          {featuresData.map((feature, index) => (
            <Feature
              key={index}
              iconSrc={feature.iconSrc}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      <section className={styles.faqsSection}>
        <h2>Employee Scheduling FAQ'S</h2>
        <div className={styles.faqs}>
          {faqsData.map((faq, index) => (
            <FAQSection
              key={index}
              faq={faq}
              index={index}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
            />
          ))}
        </div>
      </section>

      <div className={styles.ctaBottom}>
        <h2 className={styles.headingTitle}>
          The Simple 'all-in-one' HR Software Platform
        </h2>
        <p>
          Sign up now or watch a demo to see how CrewHR can help you manage your
          people.
        </p>
        <button className={styles.greenButton} onClick={openModal}>
          Watch A Demo
        </button>
      </div>
    </div>
  )
}

export default CrewhrContent
