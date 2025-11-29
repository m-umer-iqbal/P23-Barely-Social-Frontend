import React from 'react'
import MakePost from './subComponents/MakePost'
import Post from './subComponents/Post'

const MainSection = () => {
    return (
        <div className='min-w-[44%] max-w-[44%] flex flex-col gap-8 p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen'>
            <MakePost />
            <div className='space-y-4 px-2 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0'>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>

    )
}

export default MainSection
