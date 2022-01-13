import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// REDUX
import { createOrder } from '../../../redux/actions/order';
import { ORDER_CREATE_RESET } from '../../../redux/constants/order';
// COMPONENTS
import { CheckoutSteps } from '../../../shared/checkout/CheckoutSteps'
import LoadingBox from '../../../shared/loadingbox/LoadingBox';
import { MessageBox } from '../../../shared/messagebox/MessageBox';
export default function PlaceOrderScreen() {
    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        navigate('/', { replace: true });
    }
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    if (!cart.paymentMethod) {
        navigate('/payment', { replace: true });
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        //TODO: dispatch place order action
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {

        if (success) {
            navigate(`/orderDetail/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET
            });
        }

    }, [success, order, navigate]);
    return (
        <div className='flex flex-col'>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='
            flex flex-col items-start gap-y-10
            lg:flex-row lg:gap-x-5 mx-5 lg:gap-y-0
            '>
                <div className='w-full lg:w-3/4 flex flex-col gap-y-5'>

                    <div className='transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>
                        <div className='mb-5'>
                            <p className='font-bold text-gray-700 text-3xl'>Shipping</p>
                        </div>
                        <div className='mb-5'>

                            <p className='font-bold'>Nombre completo: <span className='font-medium'>{shippingAddress.fullName}</span></p>
                        </div>
                        <div className='mb-5'>
                            <p className='font-bold'>Dirección: <span className='font-medium'>{shippingAddress.address}</span></p>
                        </div>

                    </div>

                    <div className='transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>

                        <div className='mb-5'>
                            <p className='font-bold text-gray-700 text-3xl'>Payment</p>
                        </div>
                        <div className='mb-5'>
                            <p className='font-bold'>Metodo de pago: <span className='font-medium'>{paymentMethod}</span></p>
                        </div>

                    </div>
                    <div className='transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>

                        <div className='w-full overflow-auto'>

                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className='font-bold text-gray-700 text-3xl text-left pl-5 pt-5'>Productos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((product, index) => (
                                            <tr key={index} >
                                                <td className='flex flex-row justify-between mt-8 gap-x-6'>
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/img/${product.image}`}
                                                        alt="Img_product"
                                                        className='mx-5'
                                                        style={{ width: '15%', height: '7rem' }}
                                                    />
                                                    <p className='w-56 break-words font-bold'>{product.name}</p>
                                                    <p className='font-bold text-gray-700'>
                                                        {product.qty} x {product.price} = ${product.qty * product.price}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>


                    </div>

                </div>

                <div className='w-full lg:w-3/12 transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>

                    <div className='flex flex-col gap-y-5'>
                        <p className='font-bold text-gray-700 text-3xl'>Sumatoria</p>
                        <p className='w-full'>Items: <span className='float-right text-gray-700 font-semibold'>{'$' + cart.itemsPrice.toFixed(2)}</span></p>
                        <p className='w-full'>Localización: <span className='float-right text-gray-700 font-semibold'>{'$' + cart.shippingPrice.toFixed(2)}</span></p>
                        <p className='w-full'>Tax: <span className='float-right text-gray-700 font-semibold'>{cart.taxPrice.toFixed(2)}</span></p>
                        <p className='w-full'>Total de la orden: <span className='float-right text-gray-700 font-semibold'>{'$' + cart.totalPrice.toFixed(2)}</span></p>
                        <button type='button'
                            className='transition ease-in-out bg-green-500 hover:bg-green-700 hover:scale-110 text-white font-bold py-2 px-4 rounded duration-300'
                            disabled={cart.cartItems.length <= 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                        {
                            loading && <LoadingBox />
                        }
                        
                        {
                            error && <MessageBox> { error } </MessageBox>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
