import React, { createContext, useContext, useEffect, useState } from 'react'

const defaultFormData: any = {
  day: new Date(),
  employeeName: '',
  employeeId: '',
  location: '',
  hours: '09:00AM - 05:00PM',
}

const ShiftContext = createContext<
  | {
      formData: any
      updateFormData: (fieldOrFields: any, value?: any) => void
      validateForm: () => boolean
      errors: { [key: string]: string }
      isEditMode: boolean
      isAddFromCell: boolean
    }
  | undefined
>(undefined)

export const useShiftFormContext = () => {
  const context = useContext(ShiftContext)
  if (context === undefined) {
    throw new Error(
      'useShiftFormContext must be used within a ShiftFormProvider',
    )
  }
  return context
}

export const ShiftFormProvider = ({ children, initialFormData }) => {
  const [formData, setFormData] = useState<any>(defaultFormData)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAddFromCell, setIsAddFromCell] = useState(false)
  useEffect(() => {
    if (initialFormData === null) {
      setIsEditMode(false)
      setFormData(defaultFormData)
    } else if (initialFormData.shiftData) {
      setIsEditMode(true)
      const { date, hours, location } = initialFormData.shiftData
      setFormData({
        id: initialFormData.shiftData.id,
        day: date,
        employeeId: initialFormData.employee.id,
        originalEmployeeId: initialFormData.employee.id,
        employeeName: initialFormData.employee.name,
        location,
        hours,
      })
    } else {
      setIsEditMode(false)
      setIsAddFromCell(true)
      setFormData({
        ...defaultFormData,
        day: initialFormData.day,
        employeeName: initialFormData.employee.name,
        employeeId: initialFormData.employee.id,
      })
    }
  }, [initialFormData])

  const updateFormData = (fieldOrFields: any, value) => {
    if (typeof fieldOrFields === 'string') {
      setFormData(prev => ({ ...prev, [fieldOrFields]: value }))
      if (errors[fieldOrFields]) {
        setErrors(prev => ({ ...prev, [fieldOrFields]: '' }))
      }
    } else if (typeof fieldOrFields === 'object') {
      setFormData(prev => ({ ...prev, ...fieldOrFields }))
      Object.keys(fieldOrFields).forEach(field => {
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }))
        }
      })
    }
  }
  const fieldValidations = {
    day: 'Day is required.',
    employeeName: 'Employee name is required.',
    employeeId: 'Employee ID is required.',
    location: 'Location is required.',
    hours: 'Hours are required.',
  }
  const updateErrors = (field: string, errorMessage: string) => {
    setErrors(prev => ({ ...prev, [field]: errorMessage }))
  }
  const validateForm = () => {
    let isValid = true

    Object.keys(fieldValidations).forEach(field => {
      if (!formData[field]) {
        updateErrors(field, fieldValidations[field])
        isValid = false
      } else {
        updateErrors(field, '')
      }
    })
    return isValid
  }
  return (
    <ShiftContext.Provider
      value={{
        formData,
        updateFormData,
        isEditMode,
        isAddFromCell,
        validateForm,
        errors,
      }}
    >
      {children}
    </ShiftContext.Provider>
  )
}
