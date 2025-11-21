import React from 'react'
import { useState, useRef, useEffect } from 'react'

const LeftSideBar = (props) => {
    const initialValues = [props.fullname, props.username, props.bio, props.email]

    // Edit Icon Display or not
    const [nameEdit, setNameEdit] = useState(false)
    const [bioEdit, setBioEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)

    // Actual Values Displayed
    const [fullname, setFullname] = useState(initialValues[0])
    const [bio, setBio] = useState(initialValues[2])
    const [email, setEmail] = useState(initialValues[3])

    // Is in editing mode or not
    const [isNameEditable, setIsNameEditable] = useState(false)
    const [isBioEditable, setIsBioEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState(false)

    // is something vlaues changed or not
    const [isSomethingEdited, setIsSomethingEdited] = useState(false)

    // Create a ref for the input field
    const fullnameInputRef = useRef(null)
    const bioInputRef = useRef(null)
    const emailInputRef = useRef(null)

    useEffect(() => {
        // Check if any field has changed from its original value
        const hasChanges = fullname !== initialValues[0] || bio !== initialValues[2] || email !== initialValues[3]
        setIsSomethingEdited(hasChanges)
    }, [fullname, bio, email, initialValues])

    return (
        <div className='flex flex-col items-center gap-8 min-w-[25vw] text-4xl p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <img
                    src="https://picsum.photos/2000.webp"
                    alt="Profile-Picture"
                    className='w-60 rounded-[100%] border-8 border-dark-blue-900'
                />
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setNameEdit(true) }}
                    onMouseOut={() => { setNameEdit(false) }}>
                    <input
                        type="text"
                        value={fullname}
                        placeholder='Set Your Full Name'
                        className='font-semibold text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700'
                        onChange={(e) => {
                            setFullname(e.target.value)
                        }}
                        disabled={!isNameEditable}
                        ref={fullnameInputRef}
                    />
                    <img
                        src="/src/assets/edit-icon.svg"
                        alt="Edit-Icon"
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-2 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${nameEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        onClick={() => {
                            setIsNameEditable(true) // Enable editing
                            // Focus the input field after a small delay to ensure it's enabled
                            setTimeout(() => {
                                fullnameInputRef.current.focus()
                            }, 0)
                        }}
                    />
                </div>
                <p className='text-2xl text-mid-blue-700'>@{initialValues[1]}</p>
            </div>

            <div className='flex flex-col justify-center items-center space-y-2'>
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setBioEdit(true) }}
                    onMouseOut={() => { setBioEdit(false) }}>
                    <input
                        type="text"
                        value={bio}
                        placeholder="Bio"
                        className='text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700'
                        onChange={(e) => {
                            setBio(e.target.value)
                        }}
                        disabled={!isBioEditable}
                        ref={bioInputRef}
                    />
                    <img
                        src="/src/assets/edit-icon.svg"
                        alt="Edit-Icon"
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-2 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${bioEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        onClick={() => {
                            setIsBioEditable(true) // Enable editing
                            // Focus the input field after a small delay to ensure it's enabled
                            setTimeout(() => {
                                bioInputRef.current.focus()
                            }, 0)
                        }}
                    />
                </div>
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setEmailEdit(true) }}
                    onMouseOut={() => { setEmailEdit(false) }}>
                    <input
                        type='text'
                        value={email}
                        placeholder='Email Address'
                        className='text-2xl text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        disabled={!isEmailEditable}
                        ref={emailInputRef}
                    />
                    <img
                        src="/src/assets/edit-icon.svg"
                        alt="Edit-Icon"
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-0.5 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${emailEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        onClick={() => {
                            setIsEmailEditable(true) // Enable editing
                            // Focus the input field after a small delay to ensure it's enabled
                            setTimeout(() => {
                                emailInputRef.current.focus()
                            }, 0)
                        }}
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

            {isSomethingEdited && <div>
                <a href=""><button>Update</button></a>
            </div>}
        </div>
    )
}

export default LeftSideBar