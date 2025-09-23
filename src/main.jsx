import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from "../src/store/store.js"
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignupPage from './pages/SignupPage.jsx'
import EditPost from './pages/EditPost.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPost from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import AuthLogin from './components/AuthLogin.jsx'
import Login from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element:
          <AuthLogin authentication={false}>
            <Login />
          </AuthLogin>
      },
      {
        path: "/signup",
        element:
          <AuthLogin authentication={false}>
            <SignupPage />
          </AuthLogin>
      },
      {
        path: "/add-post",
        element:
          <AuthLogin>
            <AddPost />
          </AuthLogin>
      },
      {
        path: "/all-post",
        element:
          <AuthLogin >
            <AllPost />
          </AuthLogin>
      },
      {
        path: "/edit-post/:slug",
        element:
          <AuthLogin >
            <EditPost />
          </AuthLogin>
      },
      {
        path: "/post/:slug",
        element:
          <AuthLogin>
            <Post />
          </AuthLogin>
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
