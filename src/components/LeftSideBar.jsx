import React from 'react'
import { useState } from 'react'

const LeftSideBar = (props) => {
    const [nameEdit, setNameEdit] = useState(false)
    const [bioEdit, setBioEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)

    return (
        <div className='flex flex-col items-center gap-8 min-w-[25vw] text-4xl p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <img
                    src="https://picsum.photos/2000.webp"
                    alt="Profile-Picture"
                    className='w-50 rounded-[100%]'
                />
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setNameEdit(true) }}
                    onMouseOut={() => { setNameEdit(false) }}>
                    <input
                        type="text"
                        value={props.fullname}
                        placeholder='Set Your Full Name'
                        className='font-semibold text-center field-sizing-content'
                    />
                    <img 
                        src="/src/assets/edit-icon.svg" 
                        alt="Edit-Icon" 
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-2 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${
                            nameEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`} 
                    />
                </div>
                <p className='text-2xl text-mid-blue-700'>@{props.username}</p>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setBioEdit(true) }}
                    onMouseOut={() => { setBioEdit(false) }}>
                    <input
                        type="text"
                        value={props.bio}
                        placeholder="Bio"
                        className='text-center field-sizing-content'
                    />
                    <img 
                        src="/src/assets/edit-icon.svg" 
                        alt="Edit-Icon" 
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-2 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${
                            bioEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`} 
                    />
                </div>
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setEmailEdit(true) }}
                    onMouseOut={() => { setEmailEdit(false) }}>
                    <input
                        type='text'
                        value={props.email}
                        placeholder='Email Address'
                        className='text-2xl text-mid-blue-700 text-center field-sizing-content'
                    />
                    <img 
                        src="/src/assets/edit-icon.svg" 
                        alt="Edit-Icon" 
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-0.5 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${
                            emailEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`} 
                    />
                </div>
            </div>

            <div className='flex gap-16'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold'>0</p>
                    <p className='font-semibold text-2xl text-mid-blue-700'>Followers</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold'>0</p>
                    <p className='font-semibold text-2xl text-mid-blue-700'>Following</p>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar