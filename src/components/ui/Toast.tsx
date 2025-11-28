import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { ToastContext } from '../../contexts/toastContext'
import type { Toast, ToastType } from '../../contexts/toastContext'

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = toastId++
    const newToast: Toast = { id, message, type }

    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md
            animate-slide-in-right
            ${
              toast.type === 'success'
                ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-200 dark:border-green-700'
                : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-200 dark:border-red-700'
            }
          `}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-hidden="true">
              {toast.type === 'success' ? '✓' : '✕'}
            </span>
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
