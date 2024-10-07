import React from 'react'

import styles from './Loading.module.scss'

export const Loading = ({ hasDescription }: { hasDescription: boolean }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      {hasDescription && (
        <p className={styles.loadingDescription}>
          Scheduling in progress. These calculations can take up to 60 seconds
          or longer.
        </p>
      )}
    </div>
  )
}
