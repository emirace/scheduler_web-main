import { StateCreator } from 'zustand'

// Define the types for your grid data
export type Choice = {
  label: string
  value: string
}

export type Row = {
  name: string | null
  role: string | null
  location: string | null
  unavail_dates: string | null
}

export type LocationData = {
  name: string
  data: Array<{
    role: string
    mon: string
    tue: string
    wed: string
    thu: string
    fri: string
    sat: string
    sun: string
  }>
}

export type GridSliceT = {
  data: Row[] // Employee data
  locations: LocationData[] // Location table data
  selectedLocations: Choice[] // MultiSelect selected values
  isPopupOpen: boolean // Popup state for adding new location
  newLocationName: string // The name of the new location to be added
  addLocation: (name: string) => void
  setPopupOpen: (isOpen: boolean) => void
  setData: (newData: Row[]) => void
  setSelectedLocations: (selected: Choice[]) => void
  setLocations: (newLocations: LocationData[]) => void
  setNewLocationName: (name: string) => void
  removeLocation: (index: number) => void
}

// Initial default values for the slice
const defaultLocationData = [
  {
    role: 'Cashier',
    mon: '9:00-17:00',
    tue: '8:00-18:00',
    wed: '9:00-17:00',
    thu: '8:00-18:00',
    fri: '8:00-18:00',
    sat: 'Closed',
    sun: 'Closed',
  },
]

// Define the state slice using `zustand`
export const gridSlice: StateCreator<GridSliceT> = set => ({
  data: [
    { name: 'chocolate', role: 'choco', location: 'locA', unavail_dates: '' },
    { name: 'chocolate', role: 'choco', location: 'locA', unavail_dates: '' },
    { name: null, role: null, location: null, unavail_dates: null },
  ],
  locations: [],
  selectedLocations: [],
  isPopupOpen: false,
  newLocationName: '',
  addLocation: name =>
    set(state => ({
      locations: [...state.locations, { name, data: [...defaultLocationData] }],
    })),
  setPopupOpen: isOpen => set(() => ({ isPopupOpen: isOpen })),
  setData: newData => set(() => ({ data: newData })),
  setSelectedLocations: selected =>
    set(() => ({ selectedLocations: selected })),
  setLocations: newLocations => set(() => ({ locations: newLocations })),
  setNewLocationName: name => set(() => ({ newLocationName: name })),
  removeLocation: index =>
    set(state => ({
      locations: state.locations.filter((_, i) => i !== index),
    })),
})
