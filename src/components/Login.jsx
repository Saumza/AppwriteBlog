import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Input, Button } from "./index"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/authentication'
import { login } from '../store/authSlice'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const loginHandler = async (data) => {
        setError("")
        try {
            const session = await authService.login({ ...data })
            if (session) {
                const userData = await authService.getUserDetails()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
            </div >
            <form onSubmit={handleSubmit(loginHandler)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your Email...."
                        {...register("email", { reqired: true })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your Password..."
                        {...register("password", { reqired: true })}
                    />
                    <Button
                        children="Click Me"
                        type="submit"
                    />
                </div>
            </form>
        </div >
    )
}

export default Login