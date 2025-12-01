import React from 'react'

const FollowedAndUnfollowedNavbar = (props) => {

    return (
        <div className="bg-off-blue-200 flex justify-around gap-2 font-semibold p-4 sticky top-0 z-10">
            <button
                className='py-2 cursor-pointer rounded-4xl border-2 border-dark-blue-900 text-dark-blue-900 hover:bg-dark-blue-900 hover:text-off-blue-200 group min-w-[49%]'
                onClick={() => {
                    props.setCategory("followed")
                    alert("followed")
                }} >
                Followed
            </button>
            <button
                className='py-2 cursor-pointer rounded-4xl border-2 border-dark-blue-900 text-dark-blue-900 hover:bg-dark-blue-900 hover:text-off-blue-200 group min-w-[49%]'
                onClick={() => {
                    props.setCategory("notFollowed")
                    alert("not followed clicked")
                }} >
                Not Followed
            </button>
        </div>
    )
}

export default FollowedAndUnfollowedNavbar
