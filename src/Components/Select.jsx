import { forwardRef } from 'react';
import {useId} from 'react'

function Select(
    {
        options = [],
        label,
        className = "",
        labelColor = "text-white",
        ...props
    }, ref
) {
    const id = useId();
  return (
    <div>
        {label && <label htmlFor={id} className={`${labelColor}`} />}
        <select
            className={`${className}`}
            {...props}
        >
            {options?.map((option) => (
                <option key={option} value={option} className='text-black'>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default forwardRef(Select)