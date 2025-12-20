import React from 'react'

const ProfilePicture = (props) => {
    const defaultUrl = "https://picsum.photos/2000.webp"
    return (
        <div>
            <img className="min-w-14 max-w-14 rounded-[100%]" src={props.profilePicture || defaultUrl} alt="DP" loading="lazy" />
        </div>
    )
}

export default ProfilePicture
