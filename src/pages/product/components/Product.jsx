import React from "react";
import { Link } from 'react-router-dom';
export const Product = ({ product }) => {
    return (
        <div className="transition ease-out max-w-sm bg-white rounded overflow-hidden shadow-2xl hover:shadow-green-500 duration-300">
            <img className="w-3/4 mx-12" src={`${process.env.PUBLIC_URL}/img/${product.image}`} alt="Sunset in the mountains" />
            <div className='flex flex-col mx-10 my-5'>

                <div className="flex-none w-full text-center">
                    <div className="font-bold text-base mb-2">
                        <p className='text-3xl'>{ product.category.charAt(0).toUpperCase() + product.category.slice(1) }</p>
                        <p className='text-gray-400 text-sm my-3'>{product.name}</p>
                    </div>
                </div>
                <div className='flex-initial w-full'>
                    <p className='text-green-500 font-semibold text-center text-2xl'>${product.price.$numberDecimal}</p>
                </div>
            </div>
            <Link
                to={`/product/${product._id}`}
            >
                <button
                    className='
                transition ease-in-out w-full bg-green-500 hover:bg-green-700 duration-300
                text-white font-bold text-xl py-2 justify-self-center
            '>
                    Comprar
                </button>
            </Link>
            {/* <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div> */}
        </div>

    )
}
