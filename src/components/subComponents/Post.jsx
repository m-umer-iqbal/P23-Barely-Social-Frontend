import React from 'react'

const Post = (props) => {
    return (
        <div className='flex flex-col gap-4 bg-dark-blue-900 text-off-blue-200 rounded-4xl p-4 overflow-y-auto text-2xl'>
            <div className='flex gap-4'>
                <img
                    src="https://picsum.photos/2000.webp"
                    alt="DP"
                    className='min-w-14 max-w-14 rounded-[100%]'
                />
                <div className='flex flex-col'>
                    <p>Display Name</p>
                    <p className='text-sm'>Date</p>
                </div>
            </div>
            <div>Content of the Post</div>
            <div className='flex justify-around gap-2 font-semibold border-t-2 border-off-blue-200 pt-2'>
                <div className='flex flex-col justify-center items-center gap-2 min-w-[49%]'>
                    <span className='text-lg'>0 Likes</span>
                    <button className='flex gap-2 justify-center py-2 min-w-full cursor-pointer rounded-4xl border-2 border-off-blue-200 text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900 group'>
                        <img
                            src="/src/assets/like-icon.svg"
                            alt="like-button"
                            className='w-8 filter filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]'
                        />
                        <span>Like</span>
                    </button>
                </div>
                <div className='flex flex-col justify-center items-center gap-2 min-w-[49%]'>
                    <span className='text-lg'>0 Dislikes</span>
                    <button className='flex gap-2 justify-center py-2 cursor-pointer min-w-full rounded-4xl border-2 border-off-blue-200 text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900 group'>
                        <img
                            src="/src/assets/dislike-icon.svg"
                            alt="dislike-button"
                            className='w-8 filter filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]'
                        />
                        <span>Dislike</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post
