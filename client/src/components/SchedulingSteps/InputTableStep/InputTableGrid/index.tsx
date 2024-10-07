import React, { useLayoutEffect, useRef, useState } from 'react'
import {
  CellProps,
  Column,
  DataSheetGrid,
  dateColumn,
  keyColumn,
  textColumn,
} from 'react-datasheet-grid'
import { MultiSelect } from 'react-multi-select-component'
import Select, { GroupBase, SelectInstance } from 'react-select'

import 'react-datasheet-grid/dist/style.css'
import styles from './InputTableGrid.module.scss'

import { useStore } from '@/store/useStore'

type Choice = {
  label: string
  value: string
}

type SelectOptions = {
  choices: Choice[]
  disabled?: boolean
}

const SelectComponent = React.memo(
  ({
    active,
    rowData,
    setRowData,
    focus,
    stopEditing,
    columnData,
  }: CellProps<string | null, SelectOptions>) => {
    const ref = useRef<SelectInstance<Choice, false, GroupBase<Choice>>>(null)

    useLayoutEffect(() => {
      if (focus) {
        ref.current?.focus()
      } else {
        ref.current?.blur()
      }
    }, [focus])

    console.log(columnData)

    return (
      <Select
        ref={ref}
        styles={{
          container: provided => ({
            ...provided,
            flex: 1,
            alignSelf: 'stretch',
            pointerEvents: focus ? undefined : 'none',
          }),
          control: provided => ({
            ...provided,
            height: '100%',
            border: 'none',
            boxShadow: 'none',
            background: 'none',
          }),
          indicatorSeparator: provided => ({
            ...provided,
            opacity: 0,
          }),
          indicatorsContainer: provided => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
          placeholder: provided => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
        }}
        isDisabled={columnData.disabled}
        value={
          columnData.choices.find(({ value }) => value === rowData) ?? null
        }
        menuPortalTarget={document.body}
        menuIsOpen={focus}
        onChange={choice => {
          if (choice === null) {
            return
          }

          setRowData(choice.value)
          setTimeout(stopEditing, 0)
        }}
        onMenuClose={() => stopEditing({ nextRow: false })}
        options={columnData.choices}
      />
    )
  },
)

const selectColumn = (
  options: SelectOptions,
): Column<string | null, SelectOptions> => ({
  component: SelectComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find(choice => choice.value === rowData)?.label ?? null,
  pasteValue: ({ value }) =>
    options.choices.find(choice => choice.label === value)?.value ?? null,
})

export const InputTableGrid = () => {
  const {
    data,
    setData,
    employeeLocations,
    addLocation,
    removeLocation,
    setLocations,
    isPopupOpen,
    setPopupOpen,
    selectedLocations,
    setSelectedLocations,
    newLocationName,
    setNewLocationName,
  } = useStore()

  const locationOptions = [
    { label: 'Location A', value: 'locA' },
    { label: 'Location B', value: 'locB' },
  ]

  const LocationSelectComponent = () => (
    <MultiSelect
      options={locationOptions}
      value={selectedLocations}
      onChange={setSelectedLocations}
      labelledBy="Select"
      isCreatable={true}
    />
  )

  const locationColumns = [
    { ...keyColumn('role', textColumn), title: 'Role' },
    { ...keyColumn('mon', textColumn), title: 'Monday' },
    { ...keyColumn('tue', textColumn), title: 'Tuesday' },
    { ...keyColumn('wed', textColumn), title: 'Wednesday' },
    { ...keyColumn('thu', textColumn), title: 'Thursday' },
    { ...keyColumn('fri', textColumn), title: 'Friday' },
    { ...keyColumn('sat', textColumn), title: 'Saturday' },
    { ...keyColumn('sun', textColumn), title: 'Sunday' },
  ]

  const employeeColumns = [
    { ...keyColumn('name', textColumn), title: 'Name' },
    { ...keyColumn('role', textColumn), title: 'Role' },
    {
      ...keyColumn(
        'location',
        selectColumn({
          choices: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ],
        }),
      ),
      title: 'Location',
    },
    { ...keyColumn('unavail_dates', dateColumn), title: 'Unavailable Dates' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isPopupOpen ? (
          <div className="popup">
            <input
              type="text"
              value={newLocationName}
              onChange={e => setNewLocationName(e.target.value)}
              placeholder="Enter location name"
            />
            <button
              onClick={() => {
                addLocation(newLocationName)
                setPopupOpen(false)
              }}
              className={styles.addButton}
            >
              ✔️
            </button>
            <button
              onClick={() => setPopupOpen(false)}
              className={styles.cancelButton}
            >
              ❌
            </button>
          </div>
        ) : (
          <button
            onClick={() => setPopupOpen(true)}
            className={styles.addLocationButton}
          >
            + New Location
          </button>
        )}
      </div>

      {employeeLocations.map((location, index) => (
        <div key={index} className={styles.tableWrapper}>
          <div className={styles.locationHeader}>
            <input
              type="text"
              value={location.name}
              onChange={e => {
                const updatedLocations = [...employeeLocations]
                updatedLocations[index].name = e.target.value
                setLocations(updatedLocations)
              }}
              className={styles.editableTitle}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
              }}
            />
            <button onClick={() => removeLocation(index)} className="btn-icon">
              ❌
            </button>
          </div>
          <DataSheetGrid
            value={location.data}
            onChange={newData => {
              const updatedLocations = [...employeeLocations]
              updatedLocations[index].data = newData
              setLocations(updatedLocations)
            }}
            columns={locationColumns}
            stickyRightColumn={{
              component: ({ deleteRow }) => (
                <button onClick={deleteRow} className="btn-icon">
                  ❌
                </button>
              ),
            }}
          />
        </div>
      ))}

      <div>
        <h3>Employees</h3>
        <DataSheetGrid
          value={data}
          onChange={setData}
          columns={employeeColumns}
          stickyRightColumn={{
            component: ({ deleteRow }) => (
              <button onClick={deleteRow} className="btn-icon">
                ❌
              </button>
            ),
          }}
        />
      </div>
    </div>
  )
}

// export const InputTableGrid = () => {
//   const locationOptions = [
//     { label: 'Location A', value: 'locA' },
//     { label: 'Location B', value: 'locB' },
//   ]

//   const [data, setData] = useState<Row[]>([
//     { name: 'chocolate', role: 'choco', location: 'locA', unavail_dates: '' },
//     { name: 'chocolate', role: 'choco', location: 'locA', unavail_dates: '' },
//     { name: null, role: null, location: null, unavail_dates: null },
//   ])

//   const [selected, setSelected] = useState([])

//   const LocationSelectComponent = () => {
//     return (
//       <MultiSelect
//         options={locationOptions}
//         value={selected}
//         onChange={setSelected}
//         labelledBy={'Select'}
//         isCreatable={true}
//       />
//     )
//   }

//   const defaultLocationData = [
//     {
//       role: 'Cashier',
//       mon: '9:00-17:00',
//       tue: '8:00-18:00',
//       wed: '9:00-17:00',
//       thu: '8:00-18:00',
//       fri: '8:00-18:00',
//       sat: 'Closed',
//       sun: 'Closed',
//     },
//   ]

//   const [locations, setLocations] = useState([]) // State to manage locations
//   const [newLocationName, setNewLocationName] = useState('') // State for new location input
//   const [isPopupOpen, setIsPopupOpen] = useState(false)

//   const addLocation = name => {
//     setLocations([...locations, { name, data: [...defaultLocationData] }])
//   }

//   const [defaultEmployeeData, setDefaultEmployeeData] = useState([
//     {
//       name: 'Jane Doe',
//       role: 'Cashier',
//     },
//     {
//       name: 'Jane Smith',
//       role: 'Manager, Supervisor',
//     },
//     {
//       name: 'Emily Davis',
//       role: 'Cashier, Inventory',
//     },
//   ])

//   const locationColumns = [
//     {
//       ...keyColumn('role', textColumn),
//       title: 'Role',
//     },
//     {
//       ...keyColumn('mon', textColumn),
//       title: 'Monday',
//     },
//     {
//       ...keyColumn('tue', textColumn),
//       title: 'Tuesday',
//     },
//     {
//       ...keyColumn('wed', textColumn),
//       title: 'Wednesday',
//     },
//     {
//       ...keyColumn('thu', textColumn),
//       title: 'Thursday',
//     },
//     {
//       ...keyColumn('fri', textColumn),
//       title: 'Friday',
//     },
//     {
//       ...keyColumn('sat', textColumn),
//       title: 'Saturday',
//     },
//     {
//       ...keyColumn('sat', textColumn),
//       title: 'Sunday',
//     },
//   ]

//   const employeeColumns = [
//     {
//       ...keyColumn('name', textColumn),
//       title: 'Name',
//     },
//     {
//       ...keyColumn('role', textColumn),
//       title: 'Role',
//     },
//     {
//       ...keyColumn(
//         'location',
//         selectColumn({
//           choices: [
//             { value: 'chocolate', label: 'Chocolate' },
//             { value: 'strawberry', label: 'Strawberry' },
//             { value: 'vanilla', label: 'Vanilla' },
//           ],
//         }),
//       ),
//       title: 'Location',
//     },
//     {
//       ...keyColumn('unavail_dates', dateColumn),
//       title: 'Unavailable Dates',
//     },
//   ]

//   const removeLocation = (index: number) => {
//     const updatedLocations = locations.filter((_, i) => i !== index)
//     setLocations(updatedLocations)
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         {isPopupOpen ? (
//           <div className="popup">
//             <input
//               type="text"
//               value={newLocationName}
//               onChange={e => setNewLocationName(e.target.value)}
//               placeholder="Enter location name"
//             />
//             <button
//               onClick={() => {
//                 addLocation(newLocationName)
//                 setIsPopupOpen(false) // Hide the button after adding
//               }}
//               className={styles.addButton}
//             >
//               ✔️ {/* Green check sign */}
//             </button>
//             <button
//               onClick={() => setIsPopupOpen(false)}
//               className={styles.cancelButton}
//             >
//               ❌ {/* Red close sign */}
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsPopupOpen(true)}
//             className={styles.addLocationButton}
//           >
//             + New Location
//           </button>
//         )}
//       </div>
//       {locations.map((location, index) => (
//         <div key={index} className={styles.tableWrapper}>
//           <div className={styles.locationHeader}>
//             <input
//               type="text"
//               value={location.name}
//               onChange={e => {
//                 const updatedLocations = [...locations]
//                 updatedLocations[index].name = e.target.value
//                 setLocations(updatedLocations)
//               }}
//               className={styles.editableTitle} // Add a class for styling
//               onKeyDown={e => {
//                 if (e.key === 'Enter') {
//                   e.preventDefault() // Prevent line breaks
//                 }
//               }}
//             />
//             <button onClick={() => removeLocation(index)} className="btn-icon">
//               ❌
//             </button>
//           </div>
//           <DataSheetGrid
//             value={location.data}
//             onChange={data => {
//               const updatedLocations = [...locations]
//               updatedLocations[index].data = data
//               setLocations(updatedLocations)
//             }}
//             columns={locationColumns}
//             stickyRightColumn={{
//               component: ({ deleteRow }) => (
//                 <button onClick={deleteRow} className="btn-icon">
//                   ❌
//                 </button>
//               ),
//             }}
//           />
//         </div>
//       ))}
//       <div>
//         <h3>Employees</h3>
//         <DataSheetGrid
//           value={defaultEmployeeData}
//           onChange={setDefaultEmployeeData}
//           columns={employeeColumns}
//           stickyRightColumn={{
//             component: ({ deleteRow }) => (
//               <button onClick={deleteRow} className="btn-icon">
//                 ❌
//               </button>
//             ),
//           }}
//         />
//       </div>
//     </div>
//   )
// }
