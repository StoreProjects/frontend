import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { logout } from '../../redux/actions/user';
import axios from 'axios';
export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { userInfo } = userSignin;
    const [toggle, setToggle] = useState(false);
    const [drop, setDrop] = useState(false);
    const [touched, setTouched] = useState(false);
    const [results, setResults] = useState(false);
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setDrop(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const logoutHandle = () => {
        dispatch(logout()).then(() => {
            navigate('/login');
        })
    }
    const navToggle = () => {
        if (toggle) {
            setToggle(false);
        } else {
            setToggle(true);
        }
    }

    function myFunction() {
        if (drop) {
            setDrop(false);
        } else {
            setDrop(true);
        }

    }

    const searchToggle = () => {
        inputRef.current.value = '';
        if(touched) {
            setTouched(false);
        } else {
            setTouched(true);
        }
    }

    // INPUT TEXT
    const searchHandle = async (e) => {
        if(e.target.value === '') return;
        const { data } = await axios.get(`/api/products/category/${e.target.value}`);
        
        if( data ) {
            setTimeout(() => {
                setResults(data);
            }, 2000);
        }
    }

    return (
        <main className='flex flex-col min-h-screen'>
            <nav className='bg-slate-50 p-6 shadow-md'>
                <i
                    className="md:hidden fas fa-align-justify text-green-600 mb-8"
                    style={{ fontSize: '2rem' }}
                    onClick={navToggle}
                />
                <div className={`
                    ${toggle ? 'flex gap-y-4' : 'hidden'} flex-col flex-wrap text-center
                    lg:flex-row lg:justify-center lg:gap-x-24 lg:flex
                    animate__animated animate__fadeIn animate__faster   
                `}
                >
                    <Link
                        to='/cart'
                        className='order-2 md:order-none relative transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                    >
                        Carrito
                        <span className='absolute bg-red-700 text-white rounded-full w-5 text-sm text-center' style={{ top: '-3px' }} id="lblCartCount"
                        >{cartItems.length}</span>
                    </Link>
                    <Link
                        className='order-1 md:order-none transition ease-in-out font-body font-bold text-4xl text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 duration-300'
                        to='/'>Shopping Star</Link>
                    {
                        userInfo ?
                            (
                                <>
                                    <Link
                                        to='#'
                                        onClick={logoutHandle}
                                        className='order-3 md:order-none md:hidden transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                                    >
                                        Cerrar sesión
                                    </Link>
                                    <div
                                        ref={wrapperRef}
                                        className='relative hidden md:inline-block order-4 '
                                    >
                                        <img
                                            src={`${ userInfo.image ? userInfo.image : `${process.env.PUBLIC_URL}/img/user_sample.png` }`}
                                            alt='user_alt'
                                            className='w-6 h-6 cursor-pointer dropbtn shadow-xl rounded-full'
                                            onClick={myFunction}
                                        />

                                        <div
                                            className={`
                                            absolute bg-white rounded-sm shadow-md z-10 right-0 w-56 py-4 text-left flex flex-col gap-y-2
                                            ${drop ? 'block' : 'hidden'}
                                        `}
                                        >
                                            <Link to='/user/profile' className='ml-5'>
                                                <p className='font-bold text-lg'>
                                                    {userInfo.name} {userInfo.lastname}
                                                </p>
                                                <p className='text-gray-400 font-normal'>
                                                    {userInfo.mail}
                                                </p>
                                            </Link>

                                            <hr />

                                            <Link
                                                to='/history'
                                                className='ml-4 font-medium text-gray-700 text-base'
                                            >
                                                Ordenes
                                            </Link>

                                            <hr />

                                            <Link
                                                to='#'
                                                className='ml-4 font-medium text-gray-700 text-base'
                                            >
                                                Ayuda
                                            </Link>

                                            <Link
                                                to='#'
                                                onClick={logoutHandle}
                                                className='ml-4 font-medium text-gray-700 text-base'
                                            >
                                                Cerrar sesión
                                            </Link>

                                        </div>
                                    </div>
                                </>
                            ) :
                            (
                                <Link
                                    className='order-3 md:order-none transition ease-in-out font-medium text-green-700 hover:text-green-500 hover:-translate-y-1 hover:scale-110 text-lg duration-300'
                                    to='/login'>Iniciar sesión</Link>
                            )
                    }
                </div>
                <div className={`${toggle ? 'flex' : 'hidden md:flex'} mt-5 gap-x-2 md:mt-8 md:mx-40 md:gap-x-5`}>
    
                    <div className='w-full'>
                        <input
                            ref={inputRef}
                            type="text"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='Buscar producto'
                            onChange={searchHandle}
                        />
                        
                        {
                            results && (
                                <div className='absolute w-2/3' >
                                    <div className={`${ touched ? 'hidden' : ' bg-white shadow-md mr-10 h-full rounded p-5' } `}>
                                        <ul>
                                            {
                                                results.map(( r, index ) => (
                                                    <li key={index} onClick={searchToggle}>
                                                        <Link to={`/explorer/${ r.name }`}>{ r.name }</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <button
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-full'
                    >
                        Buscar
                    </button>
        
                </div>

            </nav>
            <section className='flex-1'>
                <Outlet />
            </section>
            <footer className='w-full bg-green-500 mt-10'>
                <Footer />
            </footer>
        </main>
    )
}
