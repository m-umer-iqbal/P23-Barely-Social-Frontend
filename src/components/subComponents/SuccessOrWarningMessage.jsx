import React, { useEffect, useState } from 'react'

const SuccessOrWarningMessage = ({ alert, message, onClose }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (alert) {
            setShow(true)
            const timer = setTimeout(() => {
                setShow(false)
                if (onClose) onClose()
            }, 2000) // auto-hide after 2s
            return () => clearTimeout(timer)
        }
    }, [alert, onClose])

    if (!alert) return null

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4
      transition-transform duration-500 ${show ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}>

            {alert === "success" && (
                <div className="bg-green-100 border-l-8 border-green-500 text-green-900 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                    <svg className="h-10 w-10 text-green-600" viewBox="0 0 24 24" fill="none">
                        <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-2xl font-semibold">
                        Success – {message}
                    </p>
                </div>
            )}

            {alert === "error" && (
                <div className="bg-red-100 border-l-8 border-red-500 text-red-900 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                    <svg className="h-10 w-10 text-red-600" viewBox="0 0 24 24" fill="none">
                        <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-2xl font-semibold">
                        Error – {message}
                    </p>
                </div>
            )}

            {alert === "warning" && (
                <div className="bg-yellow-100 border-l-8 border-yellow-500 text-red-900 p-6 rounded-2xl flex items-center gap-4 shadow-xl">
                    <svg className="h-10 w-10 text-yellow-600" viewBox="0 0 24 24" fill="none">
                        <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-2xl font-semibold">
                        Warning – {message}
                    </p>
                </div>
            )}
        </div>
    )
}

export default SuccessOrWarningMessage
