import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark-blue-900 gap-8">
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
            <p className="text-blue-400 text-4xl font-semibold animate-pulse">
                Loading… Because Being Social Takes Efforts...
            </p>
        </div>
    )
}

export default Loading