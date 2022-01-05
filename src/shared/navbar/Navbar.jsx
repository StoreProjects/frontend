import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { logout } from '../../redux/actions/user';
export const Navbar = () => {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { userInfo } = userSignin;
    const [toggle, setToggle] = useState(false);

    const logoutHandle = () => {
        dispatch(logout());
    }
    const navToggle = () => {
        if ( toggle ) {
            setToggle(false);
        } else {
            setToggle(true);
        }
    }
    return (
        <main>
            <nav className='bg-slate-50 p-6'>
                <i 
                    className="md:hidden fas fa-align-justify text-green-600 mb-8" 
                    style={{fontSize: '2rem'}} 
                    onClick={navToggle}
                />
                <div className={`
                    ${ toggle ? 'flex gap-y-4' : 'hidden' } flex-col flex-wrap text-center
                    lg:flex-row lg:justify-center lg:gap-x-24 lg:flex
                    animate__animated animate__fadeIn animate__faster   
                `}
                >
                    <Link
                        className='lg:order-3 transition ease-in-out font-body font-bold text-4xl text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 duration-300'
                        to='/'>Shopping Star</Link>
                    <Link
                        to='#'
                        className='lg:order-1 transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                    >
                        Opciones
                    </Link>
                    <Link
                        className='lg:order-2 transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                        to='/explorer'>Explorar</Link>
                    <Link 
                        to='/cart' 
                        className='lg:order-4 relative transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                    >
                        Carrito
                        <span className='absolute bg-red-700 text-white rounded-full w-5 text-sm text-center' style={{top: '-3px'}} id="lblCartCount"
                        >{ cartItems.length }</span>
                    </Link>
                    {
                        userInfo ?
                            (
                                <Link
                                    to='#'
                                    onClick={logoutHandle}
                                    className='lg:order-5 transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                                >
                                    Cerrar sesión
                                </Link>
                            ) :
                            (
                                <Link
                                    className='lg:order-5 transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                                    to='/login'>Iniciar sesión</Link>
                            )
                    }
                </div>
                <div className={`my-3 ${ toggle ? 'flex' : 'hidden md:flex' } mt-5 gap-x-2 md:mt-8 md:mx-40 md:gap-x-5`}>
                    <input
                        type="text"
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Buscar producto'
                    />
                    <button
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Buscar
                    </button>
                </div>
            </nav>
            <section>
                <Outlet />
            </section>
            <footer className='w-full bg-green-500 mt-10'>
                <Footer />
            </footer>
        </main>
    )
}
