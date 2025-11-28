import React from 'react'
import MakePost from './subComponents/MakePost'
import Post from './subComponents/Post'

const MainSection = () => {
    return (
        <div className='min-w-[44%] max-w-[44%] flex flex-col gap-8 p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl'>
            <MakePost />
            <Post />
        </div>
    )
}

export default MainSection
