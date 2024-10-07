import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { dateSlice, DateSliceT } from './slices/dateSlice'
import { filterSlice, FilterStateT } from './slices/filterSlice'
import {
  gettingStartedSlice,
  GettingStartedStateT,
} from './slices/gettingStartedSlice'
import { loadingSlice, LoadingSliceT } from './slices/loadingSlice'
import { locationsSlice, LocationsStateT } from './slices/locationsSlice'
import { modalSlice, ModalSliceT } from './slices/modalSlice'
import {
  scheduleDateRangeSlice,
  ScheduleDateRangeSliceT,
} from './slices/scheduleDateRangeSlice'
import {
  defaultEmployees,
  scheduleSlice,
  ScheduleSliceT,
} from './slices/scheduleSlice'

import { findFirstShiftDate } from '@/utils/findFirstShiftDate'
import { gridSlice, GridSliceT } from './slices/gridSlice'

type MyState = ModalSliceT &
  LoadingSliceT &
  DateSliceT &
  FilterStateT &
  LocationsStateT &
  GettingStartedStateT &
  ScheduleDateRangeSliceT &
  GridSliceT &
  ScheduleSliceT & {
    hasHydrated: boolean
    setHydrated: (isHydrated: boolean) => void
  }

const storeCreator: StateCreator<
  MyState,
  [['zustand/persist', unknown]],
  [],
  MyState
> = (set, get, api) => ({
  ...modalSlice(set, get, api),
  ...loadingSlice(set, get, api),
  ...dateSlice(set, get, api),
  ...scheduleSlice(set, get, api),
  ...gridSlice(set, get, api),
  ...filterSlice(set, get, api),
  ...locationsSlice(set, get, api),
  ...gettingStartedSlice(set, get, api),
  ...scheduleDateRangeSlice(set, get, api),
  hasHydrated: false,
  setHydrated: (isHydrated: boolean) => set({ hasHydrated: isHydrated }),
})

export const useStore = create<MyState>(
  persist(storeCreator, {
    name: 'my-app-store',
    onRehydrateStorage: () => state => {
      if (
        state?.schedule.employeeView &&
        state?.schedule.employeeView.length > 0
      ) {
        const firstShiftDate = findFirstShiftDate(state.schedule.employeeView)
        state.setCurrentDate(firstShiftDate)
      } else {
        state?.setSchedule({ employeeView: defaultEmployees })
      }
      state?.setHydrated(true)
    },
    partialize: state => ({
      schedule: state.schedule,
      scheduleName: state.scheduleName,
      filters: state.filters,
      locations: state.locations,
      isGettingStartedClosed: state.isGettingStartedClosed,
      startDate: state.startDate,
      endDate: state.endDate,
    }),
  }) as StateCreator<MyState>,
)
