import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function AuthLogin({children, authentication = true}) {

    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.userStatus)
    const navigate = useNavigate()

    useEffect(() => {
        if (authentication && authentication != authStatus) {
            navigate("/login")
        }
        else if (!authentication && authentication != authStatus) {
            navigate("/")
        }
        setLoading(false)
    }, [authentication, authStatus, navigate])



    return (
        loading ? (
            <div>Loading...</div>
        ) : (
            <>{children}</>
        )
    )
}

export default AuthLogin