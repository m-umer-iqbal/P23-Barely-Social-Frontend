import React from 'react'
import { useState, useRef, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { idContext, isPostContentEditableContext, editPostContext, profilePictureContext } from '../../context/context';
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../Common/ProfilePicture";
import SuccessOrWarningMessage from "../Common/SuccessOrWarningMessage";

const MakePost = (props) => {
    const [alertType, setAlertType] = useState(null)
    const userId = useContext(idContext)
    const userProfilePicture = useContext(profilePictureContext)
    const { setPostToEdit } = useContext(editPostContext)
    const { isPostContentEditable, setIsPostContentEditable } = useContext(isPostContentEditableContext)
    const navigate = useNavigate();
    // Add state for profile picture
    const [postImage, setPostImage] = useState(null)

    const fileInputRef = useRef(null)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            content: props.content
        }
    });

    const contentValue = watch("content")

    const handlePostImageUpload = (e) => {
        e.preventDefault();
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
            setPostImage(file)
        }
    }

    const onSubmit = async (formdata) => {
        try {
            if (props.update) {
                const newFormData = new FormData()

                newFormData.append("content", formdata.content)

                if (postImage) {
                    newFormData.append("image", postImage) // MUST match multer
                }

                let response = await fetch(`http://localhost:3000/post/update-content?postId=${props.postId}&userId=${userId}`, {
                    method: "POST",
                    credentials: "include",
                    body: newFormData
                })
                let data = await response.json();
                if (data.success) {
                    setAlertType({ alert: 'success', message: data.message })
                    setPostToEdit({
                        inEditing: false,
                        postId: null,
                        content: ""
                    });
                    reset({ content: "", image: "" });
                    setIsPostContentEditable(false);
                    if (props.postMade) {
                        props.setPostMade(false)
                    } else {
                        props.setPostMade(true)
                    }
                    setPostImage(null)
                    navigate("/home")
                } else {
                    setAlertType({ alert: 'error', message: data.message })
                }
            } else {
                const newFormData = new FormData()

                newFormData.append("content", formdata.content)

                if (postImage) {
                    newFormData.append("image", postImage) // MUST match multer
                }

                let response = await fetch(`http://localhost:3000/post/${userId}`, {
                    method: "POST",
                    credentials: "include",
                    body: newFormData
                })
                let data = await response.json();
                if (data.success) {
                    setAlertType({ alert: 'success', message: data.message })
                    if (props.postMade) {
                        props.setPostMade(false)
                    } else {
                        props.setPostMade(true)
                    }
                    reset();
                    setPostImage(null)
                    navigate("/home")
                } else {
                    setAlertType({ alert: 'error', message: data.message })
                }
            }
        } catch (error) {
            setAlertType({ alert: 'error', message: "Posting Failed" })
        }
    }

    useEffect(() => {
        if (props.update && props.content) {
            reset({ content: props.content, image: props.image });
        } else if (!props.update) {
            reset({ content: "", image: null });
        }
    }, [props.update, props.content, reset]);

    // Function to trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click()
    }

    return (
        <form className='static top-0 bg-dark-blue-900 text-off-blue-200 rounded-4xl p-4 space-y-4' onSubmit={handleSubmit(onSubmit)}>
            {alertType && alertType.alert && (
                <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
            )}
            <div className='flex gap-4'>
                <ProfilePicture profilePicture={userProfilePicture} />

                <div className="flex flex-col gap-2">
                    <textarea
                        className='font-semibold field-sizing-content focus:outline-none border-transparent bg-transparent text-off-blue-200 w-full max-w-full resize-none leading-tight wrap-break-words overflow-y-hidden break-all overflow-x-hidden
                        placeholder-mid-blue-700
                        text-sm
                        sm:text-base
                        md:text-xl
                        lg:text-2xl'
                        placeholder="Share your thoughts..."
                        autoComplete='off'
                        {...register("content", {
                            required: "Type something to be Barely Soical 😏",
                            maxLength: {
                                value: 500,
                                message: "Whoa there! That’s too social — max 500 characters 😅",
                            }
                        })}
                        maxLength={500}
                        onFocus={() => setIsPostContentEditable(true)}
                        onBlur={() => setIsPostContentEditable(false)}
                    />
                    <div>
                        {postImage ? (
                            <img
                                src={URL.createObjectURL(postImage)}
                                alt="Post"
                                className="mt-2 rounded-4xl"
                            />
                        ) : props.image && !isSubmitting ? (
                            <img
                                src={props.image}
                                alt="Existing post"
                                className="mt-2 rounded-4xl"
                            />
                        ) : null}
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <button
                    type="button"
                    className='flex gap-2 rounded-4xl font-semibold cursor-pointer border-2 border-off-blue-200 text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900 group transition-all duration-300 ease-in-out
                    px-2 py-1 text-xs
                    sm:px-2.5 sm:py-1.5 sm:text-sm
                    md:px-3 md:py-2 md:text-base'
                    onClick={triggerFileInput}
                >
                    <img
                        src="/src/assets/image-upload-icon.svg"
                        alt="Image-Upload-Icon"
                        className='filter filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]
                        w-4
                        sm:w-5
                        md:w-6' />
                    <span className="hidden sm:block">Image</span>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handlePostImageUpload}
                    />
                </button>


                {errors.content ? (
                    <span className="text-red-500 font-semibold text-center text-xs
                                    hidden
                                    sm:block">
                        {errors.content.message}
                    </span>
                ) : (
                    isPostContentEditable && (
                        <div className="text-sm text-off-blue-200 font-semibold">
                            {(contentValue || '').length}/500
                        </div>
                    )
                )}

                <div className="flex gap-2 justify-center items-center">
                    {/* Cancel Button */}
                    {(props.update && !isSubmitting) && (
                        <button
                            type="button"
                            onClick={() => {
                                reset({ content: "", image: null });
                                setPostToEdit({
                                    inEditing: false,
                                    postId: null,
                                    content: "",
                                    image: null
                                });
                                setIsPostContentEditable(false);
                                setPostImage(null);
                                if (props.onEditCancel) {
                                    props.onEditCancel();
                                }
                            }}
                            className='flex gap-1 justify-center items-center rounded-4xl font-semibold cursor-pointer border-2 border-off-blue-200 text-off-blue-200 hover:bg-red-500 hover:border-red-500 hover:text-white group transition-all duration-300 ease-in-out
                            px-2 py-1 text-xs
                            sm:px-2.5 sm:py-1.5 sm:text-sm
                            md:px-3 md:py-2 md:text-base' >
                            <span>Cancel</span>
                        </button>
                    )}

                    {/* Post Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className='flex gap-1 justify-center items-center rounded-4xl font-semibold cursor-pointer border-2 border-off-blue-200 text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900 group transition-all duration-300 ease-in-out disabled:bg-mid-blue-700 disabled:text-off-blue-200 disabled:cursor-not-allowed
                        px-2 py-1 text-xs
                        sm:px-2.5 sm:py-1.5 sm:text-sm
                        md:px-3 md:py-2 md:text-base'
                    >
                        {!isSubmitting && <img
                            src="/src/assets/post-icon.svg"
                            alt="Post"
                            className='filter filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]
                            w-4
                            sm:w-5
                            md:w-6' />}
                        <span>{props.update ? (isSubmitting ? "Updating..." : "Update") : (isSubmitting ? "Posting..." : "Post")}</span>
                    </button>
                </div>
            </div>
        </form >
    )
}

export default MakePost