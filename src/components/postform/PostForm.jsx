import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { RTE, Input, Button, Select } from '../index'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/configuration'

function PostForm({ post }) {

    const { control, register, setValue, getValues, watch, handleSubmit } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userdata)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.updatePost(data.image[0]) : null;
            if (file) {
                await appwriteService.deleteFile(post.featuredImage)
            }
            const dbUpdate = appwriteService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })
            if (dbUpdate) {
                navigate(`/post/${dbUpdate.$id}`)
            }
        }
        else {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                data.featuredImage = file.$id
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })
                if (dbPost) navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = (value) => {
        if (value && typeof value == "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-")
        else
            ""
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") (
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            )
        })
        return (() =>
            subscription.unsubscribe() //So that the subscription is not gone before it ever has a chance to listen for changes.
        )
    }, [watch, slugTransform])



    return (

        <form className="flex flex-wrap" onSubmit={handleSubmit(submit)}>
            <div className="w-2/3 px-2">
                <Input
                    label="Title:"
                    type="text"
                    placeholder="Enter title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    type="text"
                    placeholder="Enter slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => { setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }) }}
                />
                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValues={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="FeaturedImage"
                    type="file"
                    {...register("image", { required: !post })}
                />
                {post && (<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>)}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    classname={"mb-4"}
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    children={post ? "Update" : "Submit"}
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                />
            </div>
        </form>
    )
}

export default PostForm