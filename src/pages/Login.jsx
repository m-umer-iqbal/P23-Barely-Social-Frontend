import React from 'react'
import Logo from '../components/Logo'
import AlreadyHaveAccount from '../components/subComponents/AlreadyHaveAccount';
import GoogleBtn from '../components/Btns/GoogleBtn';
import GithubBtn from '../components/Btns/GithubBtn';
import FacebookBtn from '../components/Btns/FacebookBtn';
import FormHeading from '../components/subComponents/formHeading';
import LoginInputFields from '../components/LoginInputFields';

const Login = () => {
    return (
        <div className='flex bg-blue-400'>

            <div className='flex flex-col justify-center items-center space-y-8 min-w-[50%]'>
                <FormHeading heading="Back to Barely Social" />

                <LoginInputFields />

                <p className='font-semibold text-2xl'>Barely other options to get back...</p>

                <div className='flex gap-8 my-4'>
                    <FacebookBtn />
                    <GoogleBtn />
                    <GithubBtn />
                </div>

                <AlreadyHaveAccount to="/create-account" line="Do not have an account?" text="Register" />

            </div>

            <Logo width="50vw" slash="false" />

        </div>
    )
}

export default Login
