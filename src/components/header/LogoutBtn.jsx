import React from 'react'
import { logout } from "../../store/authSlice"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/authentication'


function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logouthandler = () => {
        authService.logout().then((user) => {
            if (user) {
                dispatch(logout())
                navigate("/")
            }
        })


    }

    return (
        <div className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
            <button onClick={logouthandler}>Logout</button>
        </div>
    )
}

export default LogoutBtn