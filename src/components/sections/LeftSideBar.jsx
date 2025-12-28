import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { idContext, globalRefreshContext } from '../../context/context'
import SuccessOrWarningMessage from "../Common/SuccessOrWarningMessage";

const LeftSideBar = (props) => {
    const [alertType, setAlertType] = useState(null);
    const navigate = useNavigate();
    const [showUpdateBtn, setShowUpdateBtn] = useState(true);
    const id = useContext(idContext)
    const { setGlobalRefresh } = useContext(globalRefreshContext)

    // Add state for profile picture
    const [profilePicture, setProfilePicture] = useState(null)
    const [previewImage, setPreviewImage] = useState(props.profilePicture)
    const [isImageChanged, setIsImageChanged] = useState(false)

    // Handle profile picture upload
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                setAlertType({ alert: 'warning', message: "Please select an image." })
                return
            }

            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setAlertType({ alert: 'warning', message: "File size should be less than 5MB" })
                return
            }

            setProfilePicture(file)
            setIsImageChanged(true)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)

            // Show update button
            setShowUpdateBtn(true)
        }
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            id: id,
            fullname: props.fullname,
            bio: props.bio,
            email: props.email,
            profilePicture: props.profilePicture
        },
        mode: "onChange"
    })

    // Manually update form values when inputs change
    const handleFullnameChange = (e) => {
        setValue("fullname", e.target.value, { shouldDirty: true })
    }

    const handleBioChange = (e) => {
        setValue("bio", e.target.value, { shouldDirty: true })
    }

    const handleEmailChange = (e) => {
        setValue("email", e.target.value, { shouldValidate: true, shouldDirty: true })
    }

    const onSubmit = async (formdata) => {
        try {
            const newFormData = new FormData()

            newFormData.append("fullname", formdata.fullname)
            newFormData.append("email", formdata.email)
            newFormData.append("bio", formdata.bio)

            if (profilePicture) {
                newFormData.append("profilePicture", profilePicture) // MUST match multer
            }

            let response = await fetch(`http://localhost:3000/update/${id}`, {
                method: "POST",
                credentials: "include",
                body: newFormData
            })
            let data = await response.json();
            if (data.success) {
                setAlertType({ alert: 'success', message: data.message })
                // Update the preview with new URL if available
                if (data.user.profilePicture) {
                    setPreviewImage(data.user.profilePicture)
                    setGlobalRefresh(prev => !prev)
                }
                setIsImageChanged(false)
                reset(formdata);
                setShowUpdateBtn(false); // Hide after successful update
                navigate("/home")
            } else {
                setAlertType({ alert: 'error', message: data.message })
            }
        } catch (error) {
            console.error('Update error:', error);
            setAlertType({ alert: 'error', message: error.message })
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
    const fileInputRef = useRef(null)

    useEffect(() => {
        // Manually register the fields
        register("fullname")
        register("bio")
        register("email")
    }, [register])

    // Reset the button when user starts editing again
    useEffect(() => {
        if (isDirty || isImageChanged) {
            setShowUpdateBtn(true);
        }
    }, [isDirty, isImageChanged]);

    // Function to trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click()
    }

    return (
        <div className={`${props.activeView === "profile" ? "flex" : "hidden"} flex-col items-center text-4xl p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl min-h-screen max-h-screen overflow-y-auto [&::-webkit-scrollbar]:w-0 pb-16
                        ${props.activeView === "people" ? "lg:flex" : "lg:hidden"} lg:min-w-[38vw] lg:max-w-[38vw]
                        2xl:flex 2xl:min-w-[25vw] 2xl:max-w-[25vw] 2xl:min-h-0`}>

            {alertType && alertType.alert && (
                <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
            )}

            <form
                className="flex flex-col items-center gap-8 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className="relative group">
                        {/* Image */}
                        <img
                            src={previewImage}
                            alt="DP"
                            className="object-cover rounded-full border-dark-blue-900 cursor-pointer
               transition-opacity group-hover:opacity-60
                                    border-6 
                                    w-40 h-40
                                    sm:w-44 sm:h-44
                                    md:w-48 md:h-48
                                    lg:w-40 lg:h-40 lg:border-6
                                    xl:w-48 xl:h-48"
                            onClick={triggerFileInput}
                        />

                        {/* Hover overlay */}
                        <div
                            onClick={triggerFileInput}
                            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-full opacity-0 group-hover:opacity-60 transition-opacity cursor-pointer"
                        >
                            <img
                                src="/src/assets/edit-icon.svg"
                                alt="Edit"
                                className="filter"
                            />
                        </div>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureChange}
                        />
                    </div>

                    <div className='flex justify-center items-baseline space-x-4 relative group'
                        onMouseOver={() => { setNameEdit(true) }}
                        onMouseOut={() => { setNameEdit(false) }}>
                        <input
                            type="text"
                            value={fullnameValue}
                            autoComplete='off'
                            placeholder='Full Name'
                            className='font-semibold text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700
                            text-[22px]
                            sm:text-2xl
                            md:text-[27px]
                            lg:text-3xl'
                            onChange={handleFullnameChange}
                            disabled={!isNameEditable}
                            ref={fullnameInputRef}
                            onBlur={() => setIsNameEditable(false)}
                            maxLength={20} // Add max length for character counting
                        />
                        {isNameEditable ? (
                            <div className='absolute bottom-0.5 -right-6 text-sm text-mid-blue-700'>
                                {(fullnameValue || '').length || 0}/20
                            </div>
                        ) : (
                            <img
                                src="/src/assets/edit-icon.svg"
                                alt="Edit-Icon"
                                className={`filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)] absolute bottom-0.5 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${nameEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                                onClick={() => {
                                    setIsNameEditable(true)
                                    setTimeout(() => {
                                        fullnameInputRef.current.focus()
                                    }, 0)
                                }}
                            />
                        )}
                    </div>
                    <p className='text-base text-mid-blue-700 font-semibold
                                sm:text-lg
                                md:text-xl
                                lg:text-[22px]'>@{props.username}</p>
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
                            <div className='absolute bottom-0.5 -right-6 text-sm text-mid-blue-700'>
                                {(bioValue || '').length || 0}/75
                            </div>
                        ) : (
                            <img
                                src="/src/assets/edit-icon.svg"
                                alt="Edit-Icon"
                                className={`filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)] absolute bottom-0.5 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${bioEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
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
                        <div className="flex flex-col gap-2 justify-center items-center">

                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format"
                                    }
                                })}
                                type='text'
                                value={emailValue}
                                autoComplete='off'
                                placeholder='Email Address'
                                className='text-center field-sizing-content focus:outline-none focus:border-b-4 focus:border-dark-blue-900 border-transparent bg-transparent text-dark-blue-900 placeholder-mid-blue-700
                                        text-base
                                        sm:text-lg
                                        md:text-xl
                                        lg:text-[21px]
                                        xl:text-2xl
                                        2xl:text-xl'
                                onChange={handleEmailChange}
                                disabled={!isEmailEditable}
                                ref={emailInputRef}
                                onBlur={() => setIsEmailEditable(false)}
                                maxLength={30} // Add max length for character counting
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        {isEmailEditable ? (
                            <div className='absolute bottom-0.5 -right-6 text-sm text-mid-blue-700'>
                                {(emailValue || '').length || 0}/30
                            </div>
                        ) : (
                            <img
                                src="/src/assets/edit-icon.svg"
                                alt="Edit-Icon"
                                className={`filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)] absolute bottom-0.5 -right-4 cursor-pointer transition-all duration-300 ease-in-out ${emailEdit ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
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
                        <p className='font-bold'>{props.followers}</p>
                        <p className='font-semibold text-2xl text-mid-blue-700
                                    lg:text-xl'>Followers</p>
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold'>{props.following}</p>
                        <p className='font-semibold text-2xl text-mid-blue-700
                                    lg:text-xl'>Following</p>
                    </div>
                </div>

                {((isDirty || isImageChanged) && showUpdateBtn) && <input
                    type='submit'
                    value={isSubmitting ? "Processing..." : "Update"}
                    disabled={isSubmitting}
                    className='text-3xl bg-off-blue-200 text-dark-blue-900 border-2 border-dark-blue-900 font-semibold rounded-4xl my-4 px-8 py-4 hover:bg-dark-blue-900 hover:text-off-blue-200 cursor-pointer disabled:bg-mid-blue-700 disabled:text-off-blue-200 disabled:cursor-not-allowed transition-all duration-300 ease-in-out'
                />}
            </form>
            {!isDirty && !isImageChanged && <div>
                <a href="http://localhost:3000/logout"><button className='text-3xl bg-off-blue-200 text-dark-blue-900 border-2 border-dark-blue-900 font-semibold rounded-4xl my-12 px-8 py-4 hover:bg-red-500 hover:border-red-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out'>
                    Logout
                </button></a>
            </div>}
        </div>
    )
}

export default LeftSideBar