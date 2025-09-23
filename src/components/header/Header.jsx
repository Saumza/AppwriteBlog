import React from 'react'
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Logo, LogoutBtn, Container } from "../index"


function Header() {

  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.userStatus)
  const navItems = [
    {
      name: "Home",
      url: "/",
      status: true
    },
    {
      name: "Login",
      url: "/login",
      status: !authStatus
    },
    {
      name: "SignUp",
      url: "/signup",
      status: !authStatus
    },
    {
      name: "All Posts",
      url: "/all-post",
      status: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      status: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-grey-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => (
              item.status ? (
                <li key={item.name}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                  <button onClick={() => navigate(item.url)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}

            {authStatus && <li><LogoutBtn /></li>}
          </ul>
        </nav>
      </Container>
    </header >
  )
}

export default Header