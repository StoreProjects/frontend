import React from 'react';
export const Footer = () => {
    return (
        <div className='container'>
            <div className='flex flex-col justify-center py-10'>
                <div className='text-center text-white py-5'>
                    <b className='font-semibold text-2xl'>ShoppingStar</b> es una tienda digital construida en NodeJS
                    integrada con ReactJS, Express, etc.
                </div>
                <hr className='w-3/4 self-center' />
                <div className='text-center text-white py-5'>
                    <b className='font-semibold text-lg'>ShoppingStar v1.0.0</b>
                </div>
            </div>
        </div>
    )
}
