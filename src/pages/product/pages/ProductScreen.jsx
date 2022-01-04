import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOneProduct } from '../../../redux/actions/product';

export default function ProductScreen() {
    const params = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.productListOne);
    const { loading, error, product } = state;
    const [qty, setQty] = useState(1);
    useEffect(() => {
        dispatch(listOneProduct(String(params.id)))
    }, [dispatch, params.id]);
    return (
        <>
            {
                loading ? (<p>Cargando...</p>) : error ? (<p>Error...</p>) :
                    (
                        <div className='container mx-auto mt-10' key={product._id}>
                            <div className="flex flex-row justify-center gap-x-10">
                                <div className='w-96'>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/${product.image}`}
                                        className='shadow-xl p-8'
                                        alt="IMG_PRODUCT"
                                    />
                                    <div className='flex flex-row justify-center gap-x-4 mt-5'>
                                        <div className='w-3/12 h-24 shadow-2xl'>imagen de prueba</div>
                                        <div className='w-3/12 shadow-2xl'>imagen de prueba</div>
                                        <div className='w-3/12 shadow-2xl'>imagen de prueba</div>
                                    </div>
                                </div>
                                <div className='w-96'>
                                    <p className='font-semibold'>{product.name}</p>
                                    <p className='text-cyan-700 my-3' >Marca: {product.brand}</p>
                                    {
                                        product.description
                                    }
                                </div>
                                <div className='w-80'>
                                    <div className='w-full border-2 rounded-lg p-7'>
                                        <p className='my-3 text-xl'><strong>Precio: </strong>{'$' + product.price.$numberDecimal}</p>
                                        <p className={`my-3 text-xl ${product.stock > 0 ? 'text-black' : 'text-red-600'}`}><strong className='text-black'>Estado: </strong>{product.stock > 0 ? 'En stock' : 'Sin stock'}</p>
                                        <strong className='text-xl'>Cantidad: </strong>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(parseInt(e.target.value))}
                                            className='mt-5 block appearance-none h-15 w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                        >
                                            {
                                                [...Array(product.stock).keys()].map(x => 
                                                    <option key={ x + 1} value={ x + 1 }>{ x + 1}</option>    
                                                )
                                            }
                                        </select>

                                        <button className='mt-5 w-full transition ease-out bg-green-500 hover:bg-green-700 duration-300 text-white font-bold py-2 px-4 rounded'>
                                            Añadir al carro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}
