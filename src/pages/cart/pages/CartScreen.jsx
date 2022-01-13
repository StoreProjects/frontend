import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cart';
import { Item } from '../components/Item';
export default function CartScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const { id: productId } = params;
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;

    const precioTotal = cartItems.reduce((a, c) => a + (c.price * c.qty), 0).toFixed(2);
    const descuento = 0.00;
    const total = (precioTotal - (precioTotal * descuento)).toFixed(2);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }
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
                    <div className='container mx-auto font-open my-10'>
                        <div className='
                        flex flex-col gap-y-5
                        lg:flex-row lg:gap-x-8 lg:gap-y-0
                        '>
                            <div
                                style={{ height: '26rem' }}
                                className='
                                w-full bg-white rounded-lg shadow-xl overflow-auto
                                lg:w-9/12
                                '>
                                <table className='table-auto'>
                                    <thead>
                                        <tr>
                                            <th className='text-gray-400 text-left pl-5 pt-5'>Producto</th>
                                            <th className='text-gray-400 text-left pl-32 lg:pl-5 pt-5'>Cantidad</th>
                                            <th className='text-gray-400 text-left pl-5 pt-5'>Precio</th>
                                            <th className='text-gray-400 text-left pl-5 pt-5'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.map((item, index) => (
                                                <Item item={ item } key={index} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className='w-full lg:w-3/12'>
                                <div className='flex flex-col gap-y-5'>
                                    <div className='w-full rounded-lg bg-white shadow-xl'>
                                        <div className='mx-5 my-5'>
                                            <div className='mb-5'>
                                                <p className=''>Tiene cupon?</p>
                                            </div>
                                            <div>
                                                <input type="text"
                                                    className='shadow appearance-none border rounded-l-lg w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                    placeholder='Cupon...'
                                                />
                                                <button type='button'
                                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-lg'
                                                >Aplicar</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full rounded-lg bg-white shadow-xl'>
                                        <div className='flex flex-col gap-y-5 mx-5 my-5'>
                                            <p className='font-semibold'>Precio Total: <span className='font-extrabold ml-3'>{'$' + cartItems.reduce((a, c) => a + (c.price * c.qty), 0).toFixed(2)}</span></p>
                                            <p className='font-semibold'>Descuento: <span className='font-extrabold text-red-600 ml-3'>{'$' + descuento}</span></p>
                                            <p className='font-semibold'>Total: <span className='font-extrabold ml-3'>{'$' + total}</span></p>
                                            <button type='button' onClick={checkoutHandler}
                                                className='transition ease-in-out bg-green-500 hover:bg-green-700 hover:scale-110 text-white font-bold py-2 px-4 rounded duration-300'
                                            >Proceder</button>
                                            <Link to='/'
                                                className='text-center transition ease-in-out bg-yellow-500 hover:bg-yellow-700 hover:scale-110 text-white font-bold py-2 px-4 rounded duration-300'
                                            >Seguir comprando</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
