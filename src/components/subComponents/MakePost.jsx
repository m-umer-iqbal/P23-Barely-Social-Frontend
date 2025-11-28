import React from 'react'

const MakePost = () => {
    return (
        <div className='bg-dark-blue-900 text-off-blue-200 rounded-4xl p-4 space-y-4'>
            <textarea
                className='text-2xl font-semibold field-sizing-content focus:outline-none border-transparent bg-transparent text-off-blue-200 placeholder-mid-blue-700 w-full max-w-full resize-none leading-tight wrap-break-words overflow-y-hidden'
                placeholder="Share your thoughts..."
                autoComplete='off'
            ></textarea>
            <div className='flex justify-between'>
                <a href="#">
                    <button className='flex bg-off-blue-200 text-dark-blue-900 rounded-4xl px-3 py-2 font-semibold cursor-pointer'>
                        <img src="/src/assets/image-upload-icon.svg" alt="Image-Upload-Icon" />
                        <span>Image</span>
                    </button>
                </a>
                <a href="#">
                    <button className='flex bg-off-blue-200 text-dark-blue-900 rounded-4xl px-3 py-2 font-semibold cursor-pointer'>
                        <img src="/src/assets/post-icon.svg" alt="Image-Upload-Icon" />
                        <span>Post</span>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default MakePost