import React from 'react'

const Loading = () => {
    return (
        <div className="text-center mt-8">
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div className="relative h-32 w-32">
                        <div
                            className="absolute h-full w-full animate-spin rounded-full border-[3px] border-gray-100/10 border-r-dark-blue-900 border-b-off-blue-200"
                            style={{ animationDuration: '3s' }}
                        ></div>

                        <div
                            className="absolute h-full w-full animate-spin rounded-full border-[3px] border-gray-100/10 border-t-dark-blue-900"
                            style={{
                                animationDuration: '2s',
                                animationDirection: 'reverse'
                            }}
                        ></div>
                    </div>

                    <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 blur-sm"></div>
                </div>
            </div>
            <div className="animate-pulse space-y-2 mt-4">

                <h2 className="text-2xl font-semibold text-dark-blue-900">
                    Loading...
                </h2>
                <h2 className="text-2xl font-semibold text-dark-blue-900">
                    Because Being Social Takes Efforts...
                </h2>
            </div>
        </div>
    )
}

export default Loading
