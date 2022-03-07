import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRating } from '../../../hooks/useRating';
import { listOneProduct } from '../../../redux/actions/product';
import { Comment, CommentForm } from '../../../components/product';
import { Rating } from '../../../components/product/Rating';
export default function ProductScreen() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.productListOne);
    const { loading, error, product } = state;
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    
    const [qty, setQty] = useState(1);
    useEffect(() => {
        dispatch(listOneProduct(String(params.id)));
    }, [dispatch, params.id]);

    const AddToCartHandle = () => {
        navigate(`/cart/${ product._id }?qty=${ qty }`);
    }

    const { 
        porcentajes
    } = useRating( product && product.comments );

    let productView;

    if(loading) {
        productView = <p>Cargando...</p>;
    } else {

        const AVG = (product.comments.reduce((a ,c) => a + ( c.rating ), 0) / product.comments.length) || 0;
        const commentCount = product.comments.length;

        productView = (
            <>
            {
                error ? (<p>{ error }</p>) :
                    (
                        <div className='container mx-auto mt-10' key={product._id}>
                            <div className="
                            flex flex-col mx-7 justify-center gap-y-10
                            lg:flex lg:flex-row lg:justify-center lg:gap-x-10 lg:gap-y-0
                            ">
                                <div className='w-full lg:w-96'>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/${product.image}`}
                                        className='shadow-xl p-8 w-3/4 mx-12 bg-white'
                                        alt="IMG_PRODUCT"
                                    />
                                    <div className='flex flex-row justify-center gap-x-4 mt-5'>
                                        <div className='w-3/12 h-24 shadow-2xl bg-white'></div>
                                        <div className='w-3/12 shadow-2xl bg-white'></div>
                                        <div className='w-3/12 shadow-2xl bg-white'></div>
                                    </div>
                                </div>
                                <div className='w-full lg:w-96'>
                                    <p className='font-semibold break-normal'>{product.name}</p>
                                    <p className='text-cyan-700 my-3' >Marca: {product.brand}</p>
                                    {
                                        product.description
                                    }
                                </div> 
                                <div className='w-full lg:w-80'>
                                    <div className='w-full border-2 rounded-lg p-7 bg-white'>
                                        <p className='my-3 text-xl'><strong>Precio: </strong>{'$' + product.price}</p>
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
        
                                        <button onClick={AddToCartHandle} className='mt-5 w-full transition ease-out bg-green-500 hover:bg-green-700 duration-300 text-white font-bold py-2 px-4 rounded'>
                                            Añadir al carro
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='container mx-auto mt-10'>
                                <div className="flex flex-col justify-center mx-7">
        
                                    <div className='flex flex-wrap gap-x-12 justify-center'>
        
                                        <div className='w-5/12'>
                                            <Rating avg={ AVG } count={ commentCount } porcentajes={ porcentajes } />
                                        </div> 
                                        
                                        <div       
                                            className='sm:w-5/12 flex flex-col flex-wrap w-full gap-y-6'
                                        >
                                          
                                            <p className="font-semibold text-2xl">{ product.comments.length } Comentarios</p>
                                            
                                            {
        
                                                userInfo && <CommentForm productId={ product._id } />
        
                                            }
        
                                            {
                                                product.comments.map((comment, index) => (
                                                    <Comment key={ index } i={ index } productId={ product._id } comment={ comment } />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-5"></div>
                                </div>
                                
                            </div>
                        </div>
                    )
            }
            </>
        );
        
    }

    return productView;
  
}
