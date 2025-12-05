import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

const LoginInputFields = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (formdata) => {
        try {

            let response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
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
        } catch (error) {
            console.error('Login error:', error);
            reset();
            alert("Login failed");
        }
    }

    return (
        <form className='flex flex-col justify-center items-center space-y-4 min-w-full' onSubmit={handleSubmit(onSubmit)}>

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
                autoComplete="off"
                className="input-field"
            />

            {errors.username && (
                <span className="text-red-500 text-[20px] font-semibold">
                    {errors.username.message}
                </span>
            )}

            <input
                {...register("password", {
                    required: "No password? That’s too Barely Social 😏",
                    minLength: {
                        value: 6,
                        message: "C’mon, even a Barely Social person needs more than 6 characters 🔒",
                    },
                    maxLength: {
                        value: 20,
                        message: "Trying to write your life story? Keep it under 20 characters 😅",
                    },
                })}
                type="password"
                placeholder="Password"
                autoComplete="off"
                className="input-field"
            />

            {errors.password && (
                <span className="text-red-500 text-[20px] font-semibold">
                    {errors.password.message}
                </span>
            )}

            <input
                disabled={isSubmitting}
                type="submit"
                value={isSubmitting ? "Processing..." : "Login"}
                className='text-3xl bg-dark-blue-900 text-blue-400 font-semibold rounded my-4 px-8 py-4 hover:bg-mid-blue-700 cursor-pointer disabled:bg-light-blue-500 disabled:cursor-not-allowed'
            />

        </form>
    )
}

export default LoginInputFields
