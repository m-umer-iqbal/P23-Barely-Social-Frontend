import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const LeftSideBar = (props) => {
    const navigate = useNavigate();
    const [showUpdateBtn, setShowUpdateBtn] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            id: props.id,
            fullname: props.fullname,
            bio: props.bio,
            email: props.email
        },
    })

    // Manually update form values when inputs change
    const handleFullnameChange = (e) => {
        setValue("fullname", e.target.value, { shouldDirty: true })
    }

    const handleBioChange = (e) => {
        setValue("bio", e.target.value, { shouldDirty: true })
    }

    const handleEmailChange = (e) => {
        setValue("email", e.target.value, { shouldDirty: true })
    }

    const onSubmit = async (formdata) => {
        try {
            console.log(formdata)
            let response = await fetch(`http://localhost:3000/update/${props.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formdata),
            })
            let data = await response.json();
            if (data.success) {
                alert(data.message)
                setShowUpdateBtn(false); // Hide after successful update
                navigate("/home")
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Update error:', error);
            alert("Update failed.");
        }
    }

    // Watch the fields for real-time updates
    const fullnameValue = watch("fullname")
    const bioValue = watch("bio")
    const emailValue = watch("email")

    // Edit Icon Display or not
    const [nameEdit, setNameEdit] = useState(false)
    const [bioEdit, setBioEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)

    // Is in editing mode or not
    const [isNameEditable, setIsNameEditable] = useState(false)
    const [isBioEditable, setIsBioEditable] = useState(false)
    const [isEmailEditable, setIsEmailEditable] = useState(false)

    // Create a ref for the input field
    const fullnameInputRef = useRef(null)
    const bioInputRef = useRef(null)
    const emailInputRef = useRef(null)

    useEffect(() => {
        // Manually register the fields
        register("fullname")
        register("bio")
        register("email")
    }, [register])

    // Reset the button when user starts editing again
    useEffect(() => {
        if (isDirty) {
            setShowUpdateBtn(true);
        }
    }, [isDirty]);

    return (
        <form className='flex flex-col items-center gap-8 min-w-[25vw] max-w-[25vw] text-4xl p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl' onSubmit={handleSubmit(onSubmit)}>
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
                        value={fullnameValue}
                        autoComplete='off'
                        placeholder='Full Name'
                        className='font-semibold text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700'
                        onChange={handleFullnameChange}
                        disabled={!isNameEditable}
                        ref={fullnameInputRef}
                        onBlur={() => setIsNameEditable(false)}
                        maxLength={20} // Add max length for character counting
                    />
                    {isNameEditable ? (
                        <div className='absolute bottom-2 -right-6 text-sm text-mid-blue-700'>
                            {(fullnameValue || '').length || 0}/20
                        </div>
                    ) : (
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
                    )}
                </div>
                <p className='text-2xl text-mid-blue-700'>@{props.username}</p>
            </div>

            <div className='flex flex-col justify-center items-center space-y-2'>
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setBioEdit(true) }}
                    onMouseOut={() => { setBioEdit(false) }} >
                    <textarea
                        value={bioValue}
                        autoComplete='off'
                        placeholder="Bio"
                        className='text-2xl font-semibold text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder:text-3xl placeholder-mid-blue-700 w-full max-w-full resize-none overflow-y-hidden leading-tight wrap-break-words'
                        onChange={handleBioChange}
                        disabled={!isBioEditable}
                        ref={bioInputRef}
                        onBlur={() => setIsBioEditable(false)}
                        rows={3}
                        style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                            hyphens: 'auto'
                        }}
                        maxLength={75} // Add max length for character counting
                    />
                    {isBioEditable ? (
                        <div className='absolute bottom-1 -right-6 text-sm text-mid-blue-700'>
                            {(bioValue || '').length || 0}/75
                        </div>
                    ) : (
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
                    )}
                </div>
                <div className='flex justify-center items-baseline space-x-4 relative group'
                    onMouseOver={() => { setEmailEdit(true) }}
                    onMouseOut={() => { setEmailEdit(false) }}>
                    <input
                        {...register("email")}
                        type='text'
                        value={emailValue}
                        autoComplete='off'
                        placeholder='Email Address'
                        className='text-2xl text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700'
                        onChange={handleEmailChange}
                        disabled={!isEmailEditable}
                        ref={emailInputRef}
                        onBlur={() => setIsEmailEditable(false)}
                        maxLength={30} // Add max length for character counting
                    />
                    {isEmailEditable ? (
                        <div className='absolute bottom-0.5 -right-6 text-sm text-mid-blue-700'>
                            {(emailValue || '').length || 0}/30
                        </div>
                    ) : (
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
                    )}
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

            {(isDirty && showUpdateBtn) && <input
                type='submit'
                value={isSubmitting ? "Processing..." : "Update"}
                disabled={isSubmitting}
                className='text-3xl bg-dark-blue-900 text-off-blue-200 font-semibold rounded my-4 px-8 py-4 hover:bg-mid-blue-700 cursor-pointer'
            />}
            {/* {isDirty && <div>
                <button className='text-3xl bg-dark-blue-900 text-off-blue-200 font-semibold rounded my-4 px-8 py-4 hover:bg-mid-blue-700 cursor-pointer'>
                    Logout
                </button>
            </div>} */}
        </form>
    )
}

export default LeftSideBar