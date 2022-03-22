import React, { useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategory, listProducts } from '../../redux/actions/product';

import LoadingBox from '../../shared/loadingbox/LoadingBox';
import { MessageBox } from '../../shared/messagebox/MessageBox';

export default function Explorer() {

  const [ searchParams, setSearchParams ] = useSearchParams();
  const pageRef = searchParams.get('page') ?? "";
  const handleFilter = (e) => {
    setSearchParams({ page: e });
    dispatch(listProductCategory(category, e));
  }

  let productsPerPage = 9;
  const pageNumbers = [];

  const dispatch = useDispatch();
  const productListCategory = useSelector(( state ) => state.productListCategory);
  const { loading, error, products } = productListCategory;

  const productList = useSelector((state) => state.productList);
  const { loading: productsLoading, products: productsList } = productList;

  if( !productsLoading ){
    for (let i = 1; i <= Math.ceil( productsList.length / productsPerPage ); i++) {
      pageNumbers.push(i);
    }
  }

  const params = useParams();

  const { query: category } = params;
  useEffect(() => {
    dispatch(listProductCategory(category, 1));
    dispatch(listProducts());
  }, [ dispatch, category ]);

  const productSortHandle = (e) => {
    if(!e.target.value) return;
    dispatch(listProductCategory(category, 1, e.target.value));
  }

  return (
    <div className='m-5'>
        <div className='flex flex-col flex-wrap md:flex-row h-screen'>
            <div className='md:w-1/5 bg-white rounded relative'>
              <p className='text-2xl font-open font-semibold text-center my-4'>opciones</p>
              <div className='flex flex-col'>

                <div className='my-2 mx-5'>

                  <label className='block text-gray-700 text-sm font-bold mb-2'>Ordenar por:</label>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    onChange={productSortHandle}
                  >
                    <option value="new">Nuevo</option>
                    <option value="highest">Precio: Alto a bajo</option>
                    <option value="lowest">Precio: Bajo a alto</option>
                  </select>

                </div>

                

                <div className='my-2 mx-5 absolute bottom-0'>

                  <div className='flex flex-wrap justify-center gap-1'>
                      
                      {
                        pageNumbers.map(number => (
                          <button
                            type='button'
                            key={number}
                            className={`border border-blue-500 py-1 px-2 ${ number === parseInt(pageRef) ? 'bg-blue-500' : 'bg-transparent ' }`}
                            onClick={() => handleFilter(number)}
                          >
                            { number }
                          </button>
                        ))
                      }
                  </div>

                </div>

              </div>
            </div>
            <div className='md:w-4/5 bg-transparent px-5'>
              <div className='w-full flex flex-col md:flex-row gap-5 justify-center'>
                {
                  loading ? 
                  (
                    <LoadingBox />
                  ) : error ? 
                  (
                    <MessageBox>{ error }</MessageBox>
                  ) : 
                  (
                    <>
                    {
                      products.map(( product, index ) => (
                        <div className='w-3/4 h-96 bg-white rounded relative' key={ index }>
                          <img
                            src={ `${ process.env.PUBLIC_URL }/img/${ product.image }` }
                            alt={ product.image }
                            className="transition ease-in-out delay-150 w-full h-72 p-5 hover:-translate-y-1 hover:scale-110 duration-300"
                          />
                        
                            <p className='text-center font-bold my-5'>{ product.name }</p>
                            <Link
                                to={`/product/${product._id}`}
                                className='w-full'
                            >
                              <button
                                className='
                                  transition ease-in-out bg-green-500 hover:bg-green-700 duration-300
                                  text-white font-bold text-xl py-2 justify-self-center w-full rounded-b-lg
                                '
                              >
                                { `$ ${ product.price }` }
                              </button>
                            </Link>
                          </div>
                 
                      ))
                    }
                    </>
                  )
                }
              </div>
            </div>
        </div>
    </div>
  )
}
