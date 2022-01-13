import React from 'react';
export const MessageBox = (props) => {
    return (
        <div className="w-3/6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Holy smokes!</strong>
            <span className="block sm:inline"> { props.children } </span>
        </div>
    )
}
