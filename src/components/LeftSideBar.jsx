import React from 'react'
import { useState, useRef, useEffect } from 'react'

const LeftSideBar = (props) => {
    // Edit Icon Display or not
    const [nameEdit, setNameEdit] = useState(false)
    const [bioEdit, setBioEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)

    // Actual Values Displayed
    const [fullname, setFullname] = useState(props.fullname)
    const [bio, setBio] = useState(props.bio)
    const [email, setEmail] = useState(props.email)

    // Is in editing mode or not
    const [isNameEditable, setIsNameEditable] = useState(false)
    const [isBioEditable, setIsBioEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState(false)

    // is something values changed or not
    const [isSomethingEdited, setIsSomethingEdited] = useState(false)

    // Create a ref for the input field
    const fullnameInputRef = useRef(null)
    const bioInputRef = useRef(null)
    const emailInputRef = useRef(null)

    useEffect(() => {
        const hasChanges =
            fullname !== props.fullname ||
            bio !== props.bio ||
            email !== props.email

        setIsSomethingEdited(hasChanges)
    }, [fullname, bio, email, props.fullname, props.bio, props.email])

    return (
        <div className='flex flex-col items-center gap-8 min-w-[25vw] max-w-[25vw] text-4xl p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl'>
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
                        placeholder='Full Name'
                        className='font-semibold text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700'
                        onChange={(e) => {
                            setFullname(e.target.value)
                        }}
                        disabled={!isNameEditable}
                        ref={fullnameInputRef}
                        onBlur={() => setIsNameEditable(false)}
                    />
                    <img
                        src="/src/assets/edit-icon.svg"
                        alt="Edit-Icon"
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-2 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${nameEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        onClick={() => {
                            setIsNameEditable(true)
                            setTimeout(() => {
                                fullnameInputRef.current.focus()
                            }, 0)
                        }}
                    />
                </div>
                <p className='text-2xl text-mid-blue-700'>@{props.username}</p>
            </div>

            <div className='flex flex-col justify-center items-center space-y-2'>
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setBioEdit(true) }}
                    onMouseOut={() => { setBioEdit(false) }} >
                    <textarea
                        value={bio}
                        placeholder="Bio"
                        className='text-2xl font-semibold text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder:text-3xl placeholder-mid-blue-700 w-full max-w-full resize-none overflow-y-hidden leading-tight wrap-break-words'
                        onChange={(e) => { setBio(e.target.value) }}
                        disabled={!isBioEditable}
                        ref={bioInputRef}
                        onBlur={() => setIsBioEditable(false)}
                        rows={3}
                        style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                    />
                    <img
                        src="/src/assets/edit-icon.svg"
                        alt="Edit-Icon"
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-1 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${bioEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        onClick={() => {
                            setIsBioEditable(true)
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
                        onBlur={() => setIsEmailEditable(false)}
                    />
                    <img
                        src="/src/assets/edit-icon.svg"
                        alt="Edit-Icon"
                        className={`text-[12px] fill-dark-blue-900 absolute bottom-0.5 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${emailEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        onClick={() => {
                            setIsEmailEditable(true)
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
                <button className='text-3xl bg-dark-blue-900 text-off-blue-200 font-semibold rounded my-4 px-8 py-4 hover:bg-mid-blue-700 cursor-pointer'>
                    Update
                </button>
            </div>}
            {!isSomethingEdited && <div>
                <button className='text-3xl bg-dark-blue-900 text-off-blue-200 font-semibold rounded my-4 px-8 py-4 hover:bg-mid-blue-700 cursor-pointer'>
                    Logout
                </button>
            </div>}
        </div>
    )
}

export default LeftSideBar