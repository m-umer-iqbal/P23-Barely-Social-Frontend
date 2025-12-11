import React, { useEffect, useState } from 'react'
import ProfilePicture from "./ProfilePicture"

const UsersList = (props) => {
    return (
        <div className="flex gap-4 border-b-4 pb-3">
            <div className="">
                <ProfilePicture />
            </div>
            <div className="flex flex-col font-semibold items-start gap-2">
                <p className="text-2xl">{props.fullname}</p>
                <p className="">{props.bio}</p>
                <button className="border-2 border-dark-blue-900 rounded-4xl py-1.5 px-2 cursor-pointer hover:bg-dark-blue-900 hover:text-off-blue-200">Be Social</button>
            </div>
        </div>
    )
}

export default UsersList
