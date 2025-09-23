import React, { useId } from 'react'

function Input({
    label,
    type = "text",
    className = "",
    placeholder = "",
    ref,           //this ref is pickup up by the register and in the components and data is parsed in components accordingly
    ...props }
) {
    const Id = useId()
    return (
        <div>
            {label &&
                <label id={Id} className='inline-block mb-1 pl-1'>
                    {label}
                </label>}
            <input className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                type={type}
                placeholder={placeholder}
                id={Id}
                ref={ref}    //this ref is pickup up by the register and in the components and data is parsed in components accordingly
                {...props}
            />
        </div>
    )
}


export default Input