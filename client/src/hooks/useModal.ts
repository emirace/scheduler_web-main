import { ModalId } from '@/store/slices/modalSlice'
import { useStore } from '@/store/useStore'

export const useModal = () => {
  const setModal = useStore(state => state.setModal)
  const modals = useStore(state => state.modals)

  const openModal = (modalId: ModalId) => {
    setModal(modalId, true)
  }

  const closeModal = (modalId: ModalId) => {
    setModal(modalId, false)
  }

  const isModalOpen = (modalId: ModalId) => {
    return modals.some(modal => modal.id === modalId && modal.isOpen)
  }

  return { openModal, closeModal, isModalOpen }
}
