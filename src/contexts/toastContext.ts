import { createContext } from 'react'

export type ToastType = 'success' | 'error'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

export interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type: ToastType) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
