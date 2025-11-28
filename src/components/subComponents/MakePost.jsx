import React from 'react'
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form'
import { idContext } from '../../context/context';

const MakePost = (props) => {
    const id = useContext(idContext)

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
            <textarea
                className='text-2xl font-semibold field-sizing-content focus:outline-none border-transparent bg-transparent text-off-blue-200 placeholder-mid-blue-700 w-full max-w-full resize-none leading-tight wrap-break-words overflow-y-hidden'
                placeholder="Share your thoughts..."
                autoComplete='off'
                value={contentValue}
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
            <div className='flex justify-between items-center'>
                <a href="#">
                    <button className='flex bg-off-blue-200 text-dark-blue-900 rounded-4xl px-3 py-2 font-semibold cursor-pointer'>
                        <img src="/src/assets/image-upload-icon.svg" alt="Image-Upload-Icon" />
                        <span>Image</span>
                    </button>
                </a>
                {isContentEditable && (
                    <div className='text-sm text-off-blue-200 font-semibold self-baseline-last'>
                        {(contentValue || '').length || 0}/500
                    </div>
                )}
                <div className='flex justify-center items-center bg-off-blue-200 text-dark-blue-900 rounded-4xl px-3 py-2 font-semibold cursor-pointer'>
                    <img src="/src/assets/post-icon.svg" alt="Image-Upload-Icon" />
                    <input
                        disabled={isSubmitting}
                        type="submit"
                        value={isSubmitting ? "Posting..." : "Post"}
                        className='cursor-pointer' />
                </div>
            </div>
        </form >
    )
}

export default MakePost