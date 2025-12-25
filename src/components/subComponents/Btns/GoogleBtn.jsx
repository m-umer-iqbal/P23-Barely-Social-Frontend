import React from 'react'

const GoogleBtn = () => {
  return (
    <a href="http://localhost:3000/auth/google">
      <button
        type="button"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        className="mb-2 inline-block rounded-4xl bg-[#ea4335] px-8 py-4 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-2xl focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg cursor-pointer">
        <span className="[&>svg]:h-6 [&>svg]:w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 488 512">
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
        </span>
      </button>
    </a>
  )
}

export default GoogleBtn
