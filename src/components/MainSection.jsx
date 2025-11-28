import React from 'react'
import MakePost from './subComponents/MakePost'

const MainSection = (props) => {
    return (
        <div className='min-w-[44%] max-w-[44%] flex flex-col  p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl'>
            <MakePost id={props.id} />
        </div>
    )
}

export default MainSection
