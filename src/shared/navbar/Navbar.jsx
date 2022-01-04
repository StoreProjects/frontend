import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { logout } from '../../redux/actions/user';
export const Navbar = () => {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const logoutHandle = () => {
        dispatch(logout());
    }
    return (
        <main>
            <nav className='bg-slate-50 p-6'>
                <div className='flex justify-center gap-x-24'>
                    <Link
                        className='transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                        to='/explorer'>Explorar productos</Link>
                    <Link 
                        className='transition ease-in-out font-body font-bold text-4xl text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 duration-300' 
                        to='/'>Shopping Star</Link>
                    {
                        userInfo ?
                        (
                            <Link 
                                to='#' 
                                onClick={logoutHandle}
                                className='transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                            >
                                Cerrar sesión
                            </Link>
                        ) :
                        (
                            <Link
                        className='transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                        to='/login'>Iniciar sesión</Link>
                        )
                    }
                </div>
                <div className='my-3 flex mx-40 gap-x-2'>
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
