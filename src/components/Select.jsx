import React, { useId } from 'react'

function Select({
    options,
    label,
    classname,
    ...props
}, ref) {
    const Id = useId()
    return (
        <div>
            {label &&
                <label htmlFor={Id}>
                    {label}
                </label>}
            <select className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
                id={Id}
                ref={ref}
                {...props}>
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div >
    )
}

export default Select