import React from 'react'
import { Link } from "react-router"

const AlreadyHaveAccount = (props) => {
    return (
        <div className='flex gap-2 font-semibold text-dark-blue-900 my-2
                        md:text-2xl'>
            <p>{props.line}</p>
            <Link to={props.to} className='text-dark-blue-900 underline hover:text-blue-400 hover:no-underline transition-all duration-300 ease-in-out'>{props.text}</Link>
        </div>
    )
}

export default AlreadyHaveAccount