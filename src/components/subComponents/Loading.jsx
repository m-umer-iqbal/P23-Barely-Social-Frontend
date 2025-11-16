import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-dark-blue-900">
            <div className="relative w-32 h-32">
                <div
                    className="absolute w-full h-full rounded-full border-8 border-gray-100/10 border-r-blue-400 border-b-blue-400 animate-spin"
                    style={{ animationDuration: '3s' }}
                ></div>
                <div
                    className="absolute w-full h-full rounded-full border-8 border-gray-100/10 border-t-blue-400 animate-spin"
                    style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                ></div>
                <div
                    className="absolute inset-0 bg-gradient-to-top-right from-blue-400/10 via-transparent to-blue-400/5 animate-pulse rounded-full blur-sm"
                ></div>
            </div>
        </div>
    )
}

export default Loading
