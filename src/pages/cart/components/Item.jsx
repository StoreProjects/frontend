import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/actions/cart';
export const Item = ({ item }) => {
    //const { name, price, product, image, qty, countInStock } = props;
    const dispatch = useDispatch();

    const removeHandle = ( productId ) => {
        dispatch(removeFromCart(productId));
    }
    return (
        <tr>
            <td className='flex flex-row mt-8 gap-x-6'>
                <img
                    src={`${process.env.PUBLIC_URL}/img/${item.image}`}
                    alt="Img_product"
                    className='w-40 h-32'
                />
                <div className='flex flex-col gap-y-3'>
                    <p
                        className='w-56 break-words font-bold'>{item.name}</p>
                    <p
                        className='text-gray-400'
                    >
                        Medida:
                    </p>
                    <p
                        className='text-gray-400'>Marca: {item.brand}</p>
                </div>
            </td>
            <td className='pl-28 lg:pl-0'>
                <div className='mx-5'>
                    <select
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        className='block h-12 w-36 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    >
                        {
                            [...Array(item.countInStock).keys()].map(x =>
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                            )
                        }
                    </select>
                </div>
            </td>
            <td>
                <div className='mx-5'>
                    <p className='font-extrabold'>{ '$' + item.price }</p>
                </div>
            </td>
            <td>
                <div className='mx-5 flex flex-row gap-x-4'>
                    <button type='button'
                        className='transition ease-out bg-red-500 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded'
                    >
                        <i className="far fa-heart"></i>
                    </button>
                    <button type='button'
                        className='w-full transition ease-out bg-green-500 hover:bg-green-700 duration-300 text-white font-bold py-2 px-4 rounded'
                        onClick={() => removeHandle(item.product)}
                    >
                        Borrar
                    </button>
                </div>
            </td>
        </tr>
    )
}
