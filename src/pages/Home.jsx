import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/configuration'
import { PostCard, Container } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const userStatus = useSelector((state) => state.auth.userStatus)

    useEffect(() => {
        appwriteService.getPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])


    return (
        userStatus ? (
            posts.length === 0 ? (
                <div className='w-full py-8' >
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No Posts Available.
                                </h1 >
                            </div >
                        </div >
                    </Container >

                </div >
            ) : (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div className='p-2 w-1/4' key={post.$id}>
                                    <PostCard {...post} />
                                </div>
                            )
                            )}
                        </div>
                    </Container>
                </div >
            )) : (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to see posts
                            </h1 >
                        </div >
                    </div >
                </Container >
            </div >
        ))
}

export default Home