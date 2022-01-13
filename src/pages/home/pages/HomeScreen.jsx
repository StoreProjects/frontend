import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// SCREEMS & COMPONENTS
import { listProducts } from '../../../redux/actions/product';
import shopping from '../../../assets/images/shopping.svg';
import { Product } from '../../product/components/Product';
import { MessageBox } from '../../../shared/messagebox/MessageBox';
import LoadingBox from '../../../shared/loadingbox/LoadingBox';
export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (
        <>
            <div className='
                flex flex-col my-20 mx-16
                md:flex-row
            '>
                <div className='order-2 md:order-1 flex-1'>
                    <p className='text-base md:text-7xl font-light mb-10'>
                        Más de 1500 productos
                    </p>
                    <p className='text-base md:text-lg mt-4 mb-5'>
                        En <b>Shopping Star</b> puedes comprar y vender lo que desees.<br />
                        Agrega nuevas categorías. Rankea las compras. Recibe
                        notificaciones.
                    </p>
                    <button
                        className="transition ease-in-out bg-transparent border border-green-500 text-green-500 hover:bg-green-700 hover:text-white font-bold py-2 px-4 rounded duration-300"
                    >
                        Empezar a explorar
                    </button>
                </div>
                <div className='order-1 mb-8 md:mb-0 md:order-2'>
                    <img src={shopping} alt="" />
                </div>
            </div>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col items-center justify-center md:flex-row md:gap-x-10 lg:flex-row gap-y-10'>
                {
                    loading ? (<LoadingBox />) : error ? (<MessageBox >{ error }</MessageBox>) : 
                    (
                        products?.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    )
                }
                </div>
            </div>
        </>
    )
}
