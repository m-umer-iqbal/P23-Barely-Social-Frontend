import React from 'react'
import MakePost from './subComponents/MakePost'

const MainSection = () => {
    return (
        <div className='min-w-[45%] max-w-[45%] flex flex-col  p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl'>
            <MakePost />
        </div>
    )
}

export default MainSection
