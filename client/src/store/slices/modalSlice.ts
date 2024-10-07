import { StateCreator } from 'zustand'

export type ModalId =
  | 'isSchedulingModalOpen'
  | 'isAddShiftModalOpen'
  | 'isNewShiftModalOpen'
  | 'isEditShiftModalOpen'
  | 'isRemoveShiftModalOpen'
  | 'isClearScheduleModalOpen'
  | 'isAddEmployeeModalOpen'
  | 'isEditEmployeeModalOpen'
  | 'isRemoveEmployeeModalOpen'
  | 'isEmployeeOverviewModalOpen'

export type Modal = {
  id: ModalId
  isOpen: boolean
}

export type ModalSliceT = {
  modals: Modal[]
  setModal: (modalId: ModalId, isOpen: boolean) => void
}

export const modalSlice: StateCreator<ModalSliceT> = set => ({
  modals: [],
  setModal: (modalId, isOpen) => {
    2
    set(state => {
      const updatedModals: Modal[] = state.modals.filter(
        modal => modal.id !== modalId || isOpen,
      )

      if (isOpen) {
        updatedModals.push({ id: modalId, isOpen })
      }

      return {
        modals: updatedModals,
      }
    })
  },
})
