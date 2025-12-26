import React from 'react'

const ProfilePicture = (props) => {
    const defaultUrl = "https://picsum.photos/2000.webp"
    return (
        <div>
            <img className="rounded-[100%]
                            min-w-10 max-w-10
                            sm:min-w-11 sm:max-w-11
                            md:min-w-12 md:max-w-12
                            lg:min-w-12 lg:max-w-12
                            xl:min-w-13 xl:max-w-13
                            2xl:min-w-14 2xl:max-w-14"
                src={props.profilePicture || defaultUrl} alt="DP" loading="lazy" />
        </div>
    )
}

export default ProfilePicture
