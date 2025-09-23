import React, { useState } from 'react'
import { Logo, Input, Button } from "./index"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/authentication'
import { login } from '../store/authSlice'


function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const signupHandler = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount({ ...data })
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
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center'> {error} </p>}
            </div>
            <form onSubmit={handleSubmit(signupHandler)}>
                <div className='w-full'>
                    <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter you Email..."
                        {...register("email", {
                            required: true,
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email must have a valid Input"
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter you Password..."
                        {...register("password", { required: true })}
                    />
                    <Input
                        label="Name:"
                        type="text"
                        placeholder="Enter you FullName..."
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Button
                        type="submit"
                        children="Click Me"
                    />
                </div>
            </form>
        </div>
    )
}

export default Signup