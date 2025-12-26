import React from 'react'
import AlreadyHaveAccount from '../components/subComponents/AlreadyHaveAccount';
import GoogleBtn from '../components/subComponents/Btns/GoogleBtn';
import GithubBtn from '../components/subComponents/Btns/GithubBtn';
import FacebookBtn from '../components/subComponents/Btns/FacebookBtn';
import FormHeading from '../components/subComponents/formHeading';
import LogInInputFields from "../components/LoginInputFields";

const LogIn = () => {
    return (
        <div className='bg-dark-blue-900 h-screen
                        p-2
                        sm:p-4
                        md:p-5
                        lg:p-6
                        xl:p-7
                        2xl:p-8'>
            <div className="flex flex-col justify-start items-center space-y-6 h-full rounded-4xl bg-off-blue-200 pt-10 p-1 overflow-y-auto [&::-webkit-scrollbar]:w-0
                            md:pt-8
                            lg:pt-6">
                <FormHeading heading="Back to Barely Social" />

                <LogInInputFields />

                <p className='text-dark-blue-900 font-semibold text-center
                            md:text-2xl'>Barely other options to get back...</p>

                <div className='flex gap-2 my-2'>
                    <FacebookBtn />
                    <GoogleBtn />
                    <GithubBtn />
                </div>

                <AlreadyHaveAccount to="/create-account" line="Do not have an account?" text="Sign up" />

            </div>
        </div>
    )
}

export default LogIn
