import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/configuration'
import authService from '../appwrite/authentication'
import parse from "html-react-parser"
import { Button } from '../components'


function Post() {

    const [post, setPost] = useState("")
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userdata)
    const { slug } = useParams()

    useEffect(() => {
        if (slug) (
            appwriteService.getPost(slug).then((post) => {
                if (post) (
                    setPost(post)
                )
                else navigate("/")
            }))
        else navigate("/")
    }, [slug])


    const isAuthor = userData && post ? userData.$id === post.userId : false

    const deletePost = async () => await appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
            appwriteService.deleteFile(post.featuredImage)
            navigate("/")
        }
    })



    return post ? (
        <div className="py-8">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />
            </div>
            {
                isAuthor ?
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                    :
                    null
            }
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="w-full mb-6">
                <p className='browser-css'>
                    {parse(post.content)}
                </p>
            </div>
        </div>
    ) : null
}

export default Post