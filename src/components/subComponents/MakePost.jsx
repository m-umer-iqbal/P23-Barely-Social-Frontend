import React from 'react'
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form'
import { idContext } from '../../context/context';
import { useNavigate } from "react-router-dom";

const MakePost = (props) => {
    const id = useContext(idContext)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            content: ""
        },
    });

    const contentValue = watch("content")

    const [isContentEditable, setIsContentEditable] = useState(false)

    const onSubmit = async (formdata) => {
        try {
            console.log(formdata)
            let response = await fetch(`http://localhost:3000/post/${id}`, {
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
                reset();
                if (props.postMade) {
                    props.setPostMade(false)
                } else {
                    props.setPostMade(true)
                }
                navigate("/home")
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Post error:', error);
            alert("Posting failed.");
        }
    }

    return (
        <form className='static top-0 bg-dark-blue-900 text-off-blue-200 rounded-4xl p-4 space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-4'>
                <img
                    src="https://picsum.photos/2000.webp"
                    alt="DP"
                    className='min-w-12 max-w-12 max-h-12 rounded-[100%]'
                />
                <textarea
                    className='text-2xl font-semibold field-sizing-content focus:outline-none border-transparent bg-transparent text-off-blue-200 placeholder-mid-blue-700 w-full max-w-full resize-none leading-tight wrap-break-words overflow-y-hidden'
                    placeholder="Share your thoughts..."
                    autoComplete='off'
                    {...register("content", {
                        required: "You can’t be Barely Social without writing anything 😏",
                        maxLength: {
                            value: 500,
                            message: "Whoa there! That’s too social — max 500 characters 😅",
                        }
                    })}
                    maxLength={500}
                    onFocus={() => setIsContentEditable(true)}
                    onBlur={() => setIsContentEditable(false)}
                />
            </div>

            <div className='flex justify-between items-center'>
                <a href="#">
                    <button className='flex gap-2 rounded-4xl px-3 py-2 font-semibold cursor-pointer border-2 border-off-blue-200 text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900 group'>
                        <img
                            src="/src/assets/image-upload-icon.svg"
                            alt="Image-Upload-Icon"
                            className='w-6 filter filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]' />
                        <span>Image</span>
                    </button>
                </a>

                {errors.content ? (
                    <span className="text-red-500 text-[20px] font-semibold">
                        {errors.content.message}
                    </span>
                ) : (
                    isContentEditable && (
                        <div className="text-sm text-off-blue-200 font-semibold">
                            {(contentValue || '').length}/500
                        </div>
                    )
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className='flex gap-1 justify-center items-center rounded-4xl px-3 py-2 font-semibold cursor-pointer border-2 border-off-blue-200 text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900 group'
                >
                    {!isSubmitting && <img
                        src="/src/assets/post-icon.svg"
                        alt="Post"
                        className='w-6 filter filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]' />}
                    <span>{isSubmitting ? "Posting..." : "Post"}</span>
                </button>
            </div>
        </form >
    )
}

export default MakePost