import React from 'react'

const FacebookBtn = () => {
  return (
    <a href='http://localhost:3000/auth/facebook'>
      <button
        type="button"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        className="mb-2 inline-block rounded bg-[#1877f2] px-8 py-4 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg cursor-pointer">
        <span className="[&>svg]:h-6 [&>svg]:w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 320 512">
            <path
              d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
          </svg>
        </span>
      </button>
    </a>
  )
}

export default FacebookBtn
