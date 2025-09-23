import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"

function RTE({label, name, control, defaultValues = ""}) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'> {label} </label>}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='j0zot0s6dzbcft7odbhvjozo5f3jtl92188xfgl6vclszn6v'
                        initialValue={defaultValues}
                        init={{
                            // initialValue: defaultValues, //This is part of the core TinyMCE config (used when not in React, e.g., plain JS).
                            height: 500,
                            branding: false,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"

                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </div>
    )
}

export default RTE