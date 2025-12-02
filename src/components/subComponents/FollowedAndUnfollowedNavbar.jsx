import React, { useState } from 'react'

const FollowedAndUnfollowedNavbar = (props) => {
    const [active, setActive] = useState("followed")

    return (
        <div className="bg-off-blue-200 flex justify-around gap-2 font-semibold p-4 sticky top-0 z-10">
            <button
                className={`py-2 cursor-pointer rounded-4xl border-2 border-dark-blue-900  group min-w-[49%] ${active === "followed" ? "bg-dark-blue-900 text-off-blue-200" : "text-dark-blue-900 hover:bg-dark-blue-900 hover:text-off-blue-200"}`}
                onClick={() => {
                    props.setCategory("followed")
                    setActive("followed")
                }}
            >
                Followed
            </button>
            <button
                className={`py-2 cursor-pointer rounded-4xl border-2 border-dark-blue-900  group min-w-[49%] ${active === "notFollowed" ? "bg-dark-blue-900 text-off-blue-200" : "text-dark-blue-900 hover:bg-dark-blue-900 hover:text-off-blue-200"}`}
                onClick={() => {
                    props.setCategory("notFollowed")
                    setActive("notFollowed")
                }} >
                Not Followed
            </button>
        </div >
    )
}

export default FollowedAndUnfollowedNavbar
