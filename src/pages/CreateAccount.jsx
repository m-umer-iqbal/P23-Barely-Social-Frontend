import React from 'react'
import Logo from '../components/Logo'
import CreateAccountInputFields from '../components/CreateAccountInputFields';
import AlreadyHaveAccount from '../components/subComponents/AlreadyHaveAccount';
import GoogleBtn from '../components/Btns/GoogleBtn';
import GithubBtn from '../components/Btns/GithubBtn';
import FacebookBtn from '../components/Btns/FacebookBtn';
import FormHeading from '../components/subComponents/formHeading';
const SignUp = () => {
    return (
        <div className='flex bg-blue-400 overflow-x-hidden'>
            <Logo />

            <div className='flex flex-col justify-center items-center space-y-4 min-w-[50%]'>
                <FormHeading heading="Get Social… Barely" />

                <CreateAccountInputFields />

                <p className='font-semibold text-2xl'>Barely other options to create account....</p>

                <div className='flex gap-8 my-4'>
                    <FacebookBtn />
                    <GoogleBtn />
                    <GithubBtn />
                </div>

                <AlreadyHaveAccount to="/login" line="Already have an account?" text="Login" />

            </div>

        </div>
    )
}

export default SignUp
