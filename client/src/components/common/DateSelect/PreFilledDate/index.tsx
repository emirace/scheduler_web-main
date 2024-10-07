import styles from './PreFilledDate.module.scss'

export const PreFilledDate = ({ date }) => (
  <input type="text" value={date} className={styles.dateInput} disabled />
)
