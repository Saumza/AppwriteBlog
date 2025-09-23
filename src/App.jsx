import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { login, logout } from "./store/authSlice"
import authService from './appwrite/authentication'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loader, setloader] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUserDetails().then((userdata) => {
      if (userdata) {
        dispatch(login(userdata))
      } else {
        dispatch(logout())
      }
    }).finally(() => setloader(false))
  }, [])

  if (loader) {
    return null
  } else {
    return (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full-block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
