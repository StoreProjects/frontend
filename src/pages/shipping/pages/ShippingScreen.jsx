import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutSteps } from '../../../shared/checkout/CheckoutSteps';
import { saveShippingAddress } from '../../../redux/actions/cart';
import { useNavigate } from 'react-router-dom';
export default function ShippingScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if ( !userInfo ){
        navigate('/login', { replace: true });
    }
    const [state, setState] = useState({
        fullName: '' || shippingAddress.fullName,
        address: '' || shippingAddress.address,
        city: '' || shippingAddress.city,
        postalCode: '' || shippingAddress.postalCode,
        country: '' || shippingAddress.country
    });
    const onChange = (value, campo) => {
        setState({
            ...state,
            [campo]: value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({...state}));
        navigate('/payment');
    }
    
    return (
        <>
            <div className='flex flex-col gap-y-5'>
            <CheckoutSteps step1 step2 />
            </div>
            <div className='container mx-auto flex justify-center my-5'>

                <form className='w-full mx-2 lg:w-6/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={submitHandler}>
                    <div className='mb-10'>
                        <h1 className='text-gray-700 text-center text-3xl font-bold'>Shipping Address</h1>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="fullName"
                            className='block text-gray-700 text-sm font-bold mb-2'
                        >Nombre Completo</label>
                        <input
                            type="text"
                            id='fullName'
                            name='fullName'
                            placeholder='Nombre completo...'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={state.fullName}
                            onChange={({ target }) => onChange(target.value, 'fullName')}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="address"
                            className='block text-gray-700 text-sm font-bold mb-2'
                        >Dirección</label>
                        <input
                            type="text"
                            id='address'
                            name='address'
                            placeholder='Dirección completa...'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={state.address}
                            onChange={({ target }) => onChange(target.value, 'address')}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="Ciudad"
                            className='block text-gray-700 text-sm font-bold mb-2'
                        >Ciudad</label>
                        <input
                            type="text"
                            id='Ciudad'
                            name='ciudad'
                            placeholder='Ciudad...'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={state.city}
                            onChange={({ target }) => onChange(target.value, 'city')}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="postalCode"
                            className='block text-gray-700 text-sm font-bold mb-2'
                        >Código postal o ZIP</label>
                        <input
                            type="text"
                            id='postalCode'
                            name='postalCode'
                            placeholder='Código postal(ZIP)...'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={state.postalCode}
                            onChange={({ target }) => onChange(target.value, 'postalCode')}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="ciudad"
                            className='block text-gray-700 text-sm font-bold mb-2'
                        >País</label>
                        <input
                            type="text"
                            id='ciudad'
                            name='ciudad'
                            placeholder='Nombre completo...'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={state.country}
                            onChange={({ target }) => onChange(target.value, 'country')}
                            required
                        />
                    </div>

                    <div className='mb-4 w-full'>
                        <button type='submit'
                            className='w-full transition ease-in-out bg-green-500 hover:bg-green-700 hover:scale-110 text-white font-bold py-2 px-4 rounded duration-300'
                        >
                            Continuar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
