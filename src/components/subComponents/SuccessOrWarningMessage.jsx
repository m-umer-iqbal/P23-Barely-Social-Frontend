import React, { useEffect, useState } from 'react'

const SuccessOrWarningMessage = ({ alert, message, onClose }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (alert) {
            setShow(true)
            const timer = setTimeout(() => {
                setShow(false)
                if (onClose) onClose()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [alert, onClose])

    if (!alert) return null

    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50
            w-[95%] sm:w-auto max-w-[90%] sm:max-w-xl px-3 sm:px-4
            transition-all duration-500
            ${show ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
        >

            {/* SUCCESS */}
            {alert === "success" && (
                <div className="bg-green-100 border-l-8 border-green-500 text-green-900
                    p-3 sm:p-4 md:p-6 rounded-2xl flex items-center
                    gap-3 sm:gap-4 flex-wrap sm:flex-nowrap shadow-xl">

                    <svg
                        className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <p className="font-semibold text-sm sm:text-base md:text-lg leading-snug">
                        Success – {message}
                    </p>
                </div>
            )}

            {/* ERROR */}
            {alert === "error" && (
                <div className="bg-red-100 border-l-8 border-red-500 text-red-900
                    p-3 sm:p-4 md:p-6 rounded-2xl flex items-center
                    gap-3 sm:gap-4 flex-wrap sm:flex-nowrap shadow-xl">

                    <svg
                        className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <p className="font-semibold text-sm sm:text-base md:text-lg leading-snug">
                        Error – {message}
                    </p>
                </div>
            )}

            {/* WARNING */}
            {alert === "warning" && (
                <div className="bg-yellow-100 border-l-8 border-yellow-500 text-yellow-900
                    p-3 sm:p-4 md:p-6 rounded-2xl flex items-center
                    gap-3 sm:gap-4 flex-wrap sm:flex-nowrap shadow-xl">

                    <svg
                        className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-600 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <p className="font-semibold text-sm sm:text-base md:text-lg leading-snug">
                        Warning – {message}
                    </p>
                </div>
            )}
        </div>
    )
}

export default SuccessOrWarningMessage
