import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../../../shared/checkout/CheckoutSteps';
import { savePaymentMethod } from '../../../redux/actions/cart';
export default function PaymentScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if ( !shippingAddress ) {
        navigate('/shipping');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO
        dispatch(savePaymentMethod( paymentMethod ));
        navigate('/placeOrder');
    }
    return (
        <>
            <div className='flex flex-col gap-y-5'>
                <CheckoutSteps step1 step2 step3 />
                <div className='flex flex-row w-full justify-center px-5'>
                    <form onSubmit={submitHandler} className='w-full lg:w-4/12 bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
                        <div className='mb-5'>
                            <p className='text-gray-700 text-center text-3xl font-bold'>Payment</p>
                        </div>
                        <div className='mb-4'>
                            <input type='radio'
                                id='paypal'
                                value='Paypal'
                                name='paymentMethod'
                                className='focus:outline-none focus:shadow-outline leading-tight'
                                defaultChecked
                                onChange={({ target }) => setPaymentMethod(target.value)}
                            />
                            <label htmlFor='paypal'
                                className='text-gray-700 text-lg font-bold mb-2 ml-2'
                            >Paypal</label>
                        </div>

                        <div className='mb-4'>
                            <input type='radio'
                                id='stripe'
                                value='Stripe'
                                name='paymentMethod'
                                onChange={({ target }) => setPaymentMethod(target.value)}
                            />
                            <label htmlFor='stripe'
                                className='text-gray-700 text-lg font-bold mb-2 ml-2'
                            >Stripe</label>
                        </div>

                        <div>
                            <button type='submit'
                                className='w-full transition ease-in-out bg-green-500 hover:bg-green-700 hover:scale-110 text-white font-bold py-2 px-4 rounded duration-300'
                            >
                                Continuar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
