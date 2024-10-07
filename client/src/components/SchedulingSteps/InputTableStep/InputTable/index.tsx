import { useState } from 'react' // Add this import
import Spreadsheet from 'react-spreadsheet'

import styles from './InputTable.module.scss'

export const InputTable = () => {
  const columnLabels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const initialRowLabels = ['Cashier', 'Manager', 'Inventory', ''] // Change to initialRowLabels
  const [rowLabels, setRowLabels] = useState(initialRowLabels) // Add state for rowLabels

  const handleRowLabelChange = (index: number, newLabel: string) => {
    const updatedLabels = [...rowLabels]
    updatedLabels[index] = newLabel
    setRowLabels(updatedLabels)
  }

  const data = [
    // Location A
    [
      { value: '9:00-17:00' },
      { value: '8:00-18:00' },
      { value: '9:00-17:00' },
      { value: '8:00-18:00' },
      { value: '8:00-18:00' },
      { value: 'Closed' },
      { value: 'Closed' },
    ],
    [
      { value: '9:00-17:00' },
      { value: '8:00-18:00' },
      { value: '9:00-17:00' },
      { value: '8:00-18:00' },
      { value: '8:00-18:00' },
      { value: 'Closed' },
      { value: 'Closed' },
    ],
    [
      { value: '9:00-17:00' },
      { value: '8:00-18:00' },
      { value: '9:00-17:00' },
      { value: '8:00-18:00' },
      { value: '8:00-18:00' },
      { value: 'Closed' },
      { value: 'Closed' },
    ],
  ]

  return (
    <>
      <div className={styles.container}>
        <h2>Location A</h2>
        <div>
          <Spreadsheet
            data={data}
            columnLabels={columnLabels}
            rowLabels={rowLabels.map((label, index) => (
              <input
                value={label}
                onChange={e => handleRowLabelChange(index, e.target.value)}
              />
            ))}
          />
        </div>

        <h2>Location B</h2>
        <div>
          <Spreadsheet
            data={data}
            columnLabels={columnLabels}
            rowLabels={rowLabels.map((label, index) => (
              <input
                value={label}
                onChange={e => handleRowLabelChange(index, e.target.value)} // Add input for editing
                onFocus={e => e.stopPropagation()}
              />
            ))}
          />
        </div>
      </div>
    </>
  )
}
