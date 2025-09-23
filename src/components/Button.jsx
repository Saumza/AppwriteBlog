import React from 'react'

function Button({
    children,
    type,
    className,
    bgColor = "bg-blue-400",
    textColor = "text-white",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props} type={type}>
            {children}
        </button >
    )
}

export default Button