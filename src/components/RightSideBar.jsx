import React, { useState } from 'react'

const RightSideBar = () => {
    const [active, setActive] = useState("friends")

    return (
        <div className='flex flex-col items-center min-w-[25vw] max-w-[25vw] p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen'>
            <div className="bg-off-blue-200 flex justify-around gap-2 font-semibold sticky top-0 z-10 min-w-full">
                <button
                    className={`min-w-[49%] p-1.5 cursor-pointer rounded-4xl border-2 border-dark-blue-900  group ${active === "friends" ? "bg-dark-blue-900 text-off-blue-200" : "text-dark-blue-900 hover:bg-dark-blue-900 hover:text-off-blue-200"}`}
                    onClick={() => {
                        setActive("friends")
                    }}
                >
                    Friends
                </button>
                <button
                    className={`min-w-[49%] p-1.5 cursor-pointer rounded-4xl border-2 border-dark-blue-900  group ${active === "findFriends" ? "bg-dark-blue-900 text-off-blue-200" : "text-dark-blue-900 hover:bg-dark-blue-900 hover:text-off-blue-200"}`}
                    onClick={() => {
                        setActive("findFriends")
                    }} >
                    Find Friends
                </button>
            </div >
        </div>
    )
}

export default RightSideBar
