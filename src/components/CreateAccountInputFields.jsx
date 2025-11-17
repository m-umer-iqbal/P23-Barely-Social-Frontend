import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

const CreateAccountInputFields = () => {
    const navigate = useNavigate(); // this is a hook
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (formdata) => {
        let response = await fetch("http://localhost:3000/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        })
        let data = await response.json();

        if (data.success) {
            reset();
            navigate("/home")
        } else {
            reset();
            alert(data.message)
        }
    }
    const password = watch("password");
    return (
        <form className='flex flex-col justify-center items-center space-y-4 min-w-full' onSubmit={handleSubmit(onSubmit)}>

            <input
                {...register("fullname", {
                    required: "We know you’re Barely Social, but at least tell us your name 😅",
                    minLength: {
                        value: 3,
                        message: "That is barely a name… add a few more letters 😅",
                    },
                })}
                type="text"
                placeholder="Full Name"
                autoComplete='off'
                className='input-field'
            />
            {errors.fullname && <span className="text-red-500 text-[20px] font-semibold">{errors.fullname.message}</span>}

            <input
                {...register("email", {
                    required: "Even Barely Social people need an email 📨",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "That doesn’t look like a real email, chief 👀",
                    },
                })}
                type="email"
                placeholder="Email"
                autoComplete='off'
                className='input-field'
            />
            {errors.email && <span className="text-red-500 text-[20px] font-semibold">{errors.email.message}</span>}

            <input
                {...register("username", {
                    required: "You can’t be Barely Social without a username 😏",
                    minLength: {
                        value: 3,
                        message: "That’s barely a username… add a few more letters 😅",
                    },
                    maxLength: {
                        value: 16,
                        message: "Whoa there! That’s too social — max 16 characters 😅",
                    },
                })}
                type="text"
                placeholder="Username"
                autoComplete='off'
                className='input-field'
            />
            {errors.username && <span className="text-red-500 text-[20px] font-semibold">{errors.username.message}</span>}

            <input
                {...register("password", {
                    required: "No password? That’s too Barely Social 😏",
                    minLength: {
                        value: 6,
                        message: "Even Barely Social person needs more than 6 characters 🔒",
                    },
                    maxLength: {
                        value: 20,
                        message: "Trying to write your life story? Keep it under 20 characters 😅",
                    },
                })}
                type="password"
                placeholder="Password"
                autoComplete='off'
                className='input-field'
            />
            {errors.password && <span className="text-red-500 text-[20px] font-semibold">{errors.password.message}</span>}

            <input
                {...register("confirmPassword", {
                    required: "Confirm it, don’t leave us hanging 👀",
                    validate: (value) => {
                        return value === password || "Barely matching… try typing them again 😅"
                    }
                })}
                type="password"
                placeholder="Confirm Password"
                autoComplete='off'
                className='input-field'
            />
            {errors.confirmPassword && <span className="text-red-500 text-[20px] font-semibold">{errors.confirmPassword.message}</span>}

            <input
                disabled={isSubmitting}
                type="submit"
                value={isSubmitting ? "Processing..." : "Create Account"}
                className='text-3xl bg-dark-blue-900 text-blue-400 font-semibold rounded my-4 px-8 py-4 hover:bg-mid-blue-700 cursor-pointer disabled:bg-light-blue-500 disabled:cursor-not-allowed'
            />

        </form>
    )
}

export default CreateAccountInputFields
