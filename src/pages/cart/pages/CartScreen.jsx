import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cart';
export default function CartScreen() {
    const params = useParams();
    const dispatch = useDispatch();

    const { search } = useLocation();
    const { id: productId } = params;
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    return (
        <div className='container mx-auto px-4'>
            {
                error && (<div>{error}</div>)
            }
            {
                cartItems.length === 0 ? (
                    <div>
                        Cart is empty. <Link to="/">Go shopping</Link>
                    </div>
                ) : (
                    <div className='flex flex-row gap-x-5 mt-10'>
                        <div className='w-9/12 flex flex-col'>
                            <div className='flex justify-between'>
                                <p className='font-semibold text-2xl'>Shipping Cart</p>
                                <p className='text-lg text-gray-600 font-semibold'>Precio</p>
                            </div>
                            <div className='w-full h-1 my-4 bg-gray-300'></div>
                            {
                                cartItems.map((item, index) => (
                                    <div key={index} className='flex flex-row mt-10 gap-x-10'>
                                        
                                        <div>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/${item.image}`}
                                                alt="img_product"
                                                className='w-40'
                                            />
                                        </div>
                                        <div>
                                            <p className='text-xl font-semibold text-blue-600'>{item.name.toUpperCase()}</p>
                                            {item.qty > 0 && <p className='text-xs my-2 text-green-600'>Disponible</p>}
                                            <select
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                className='mt-5 block h-12 w-36 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                            >
                                                {
                                                    [...Array(item.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                }
                                            </select>
                                            <button
                                                type='button'
                                                className='mt-2 bg-red-400 w-36 hover:bg-red-900 text-white font-bold py-2 px-4 rounded'
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                        <div className='ml-auto mr-0'>
                                            <p className='font-semibold text-2xl text-right'>US$ { item.price.$numberDecimal }</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='w-3/12 bg-gray-200 h-full text-center py-5 px-10'>
                            <span className='text-gray-900 font-semibold'>
                                Cart Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                            </span>
                            <strong className='text-lg'> $ {cartItems.reduce((a, c) => a + (c.price.$numberDecimal * c.qty), 0).toFixed(2)}</strong>
                            <button
                                type='button'
                                className='mt-5 bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                            >
                                Proceder al pago
                            </button>
                            <div className='mt-5'>
                                <p>Productos recomendados</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
