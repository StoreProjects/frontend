import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signin } from '../../../redux/actions/user';
export default function LoginScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('');

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    
    const loginCallback = (e) => {
        e.preventDefault();
        dispatch(signin( email, password ))
            .then(() => {
                setIsLoggedIn( true );
                window.location.reload();
            });
    }
    
    if ( isLoggedIn ) {
        navigate(redirect, { replace: true });
    }
    return (
        <div className='container flex mx-auto justify-center'>
            
            <div className='w-5/12 h-full mt-10'>
                <form onSubmit={loginCallback} className='w-full h-96 bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
                    <div className='mt-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="correo">
                            Correo
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder='email'
                            value={email}
                            onChange={({ target }) => setEmail( target.value )}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    {/* <p className="text-red-500 text-xs italic">{formErrors.email}</p> */}
                    <div className='mt-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="correo">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder='Contraseña'
                            name="password"
                            value={ password }
                            onChange={ ({ target }) => setPassword(target.value) }
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    {/* <p className="text-red-500 text-xs italic">{formErrors.password}</p> */}
                    <div className="flex items-center justify-between mt-10">
                        <button type='submit'
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            iniciar sesión
                        </button>
                        <Link to='/register' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Registrarme
                        </Link>
                        <Link
                            to='#'
                            className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
