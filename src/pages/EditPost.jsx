import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { PostForm, Container } from '../components'
import appwriteService from '../appwrite/configuration'

function EditPost() {
  const { slug } = useParams()
  const [post, setPost] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }
      })
    }
    else {
      navigate("/")
    }
  }, [slug])

  if (post) {
    return (
      <div>
        <Container>
          <PostForm post={post} />
        </Container>
      </div>
    )
  }
  else (
    null
  )
}

export default EditPost