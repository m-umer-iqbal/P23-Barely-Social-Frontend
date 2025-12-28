import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import SuccessOrWarningMessage from "./subComponents/SuccessOrWarningMessage";

const LogInInputFields = () => {
    const [alertType, setAlertType] = useState(null);
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
                setAlertType({ alert: 'success', message: data.message })
                navigate("/home")
            } else {
                reset();
                setAlertType({ alert: 'error', message: data.message })
            }
        } catch (error) {
            reset();
            setAlertType({ alert: 'error', message: "Error in sending login request" })
        }
    }

    return (
        <form className='flex flex-col justify-center items-center
                        w-full max-w-md md:max-w-lg
                        space-y-2
                        sm:space-y-3
                        md:space-y-4 md:mt-8'
            onSubmit={handleSubmit(onSubmit)}>
            {alertType && alertType.alert && (
                <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
            )}

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
                <span className="text-red-500 font-semibold text-center text-xs">
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
                <span className="text-red-500 font-semibold text-center text-xs">
                    {errors.password.message}
                </span>
            )}

            <input
                disabled={isSubmitting}
                type="submit"
                value={isSubmitting ? "Processing..." : "Login"}
                className='bg-off-blue-200 text-dark-blue-900 border-2 border-dark-blue-900 font-semibold rounded-4xl my-4 px-4 py-2 hover:bg-dark-blue-900 hover:text-off-blue-200 cursor-pointer disabled:bg-mid-blue-700 disabled:text-off-blue-200 disabled:cursor-not-allowed
                md:text-2xl
                transition-all duration-300 ease-in-out'
            />

        </form>
    )
}

export default LogInInputFields
