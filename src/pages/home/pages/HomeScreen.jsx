import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from '../../../redux/actions/product';
import shopping from '../../../assets/images/shopping.svg';
import { Product } from '../../product/components/Product';
export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (
        <>
            <div className='flex my-20 mx-16'>
                <div>
                    <p className='text-7xl font-light mb-10'>
                        Más de 1500 productos
                    </p>
                    <p className='mt-4 text-lg mb-5'>
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
                <div>
                    <img src={shopping} alt="" />
                </div>
            </div>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:flex-row'>
                {
                    products?.map((product) => (
                        <Product key={product._id} product={product} />
                    ))
                }
                </div>
            </div>
        </>
    )
}
