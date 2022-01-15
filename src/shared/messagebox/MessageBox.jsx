import React from 'react';
export const MessageBox = (props) => {
    return (
        <div className={`w-3/6 border ${ props.variant === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700' } px-4 py-3 rounded relative`} role="alert">
            <span className="block sm:inline"> { props.children } </span>
        </div>
    )
}
