import React from 'react'
import { Link } from "react-router"
const AlreadyHaveAccount = (props) => {
    return (
        <div className='flex gap-2 text-2xl font-semibold text-dark-blue-900 my-4'>
            <p>{props.line}</p>
            <Link to={props.to} className='text-dark-blue-900 underline hover:no-underline hover:text-off-blue-200'>{props.text}</Link>
        </div>
    )
}

export default AlreadyHaveAccount