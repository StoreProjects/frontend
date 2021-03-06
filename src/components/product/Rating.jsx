import React from 'react';
import ReactStars from 'react-rating-stars-component';

export const Rating = ({ avg, count, porcentajes }) => {
    
    return (
        <div className='h-full border bg-white shadow-sm w-full md:h-96 px-5 py-2'>
            <p className='text-4xl font-semibold'>
                Opiniones de clientes
            </p>
            
            <div title={`${ Math.round(avg) }`}>
                <ReactStars
                    count={5}
                    value={Math.round(avg)}
                    size={50}
                    isHalf={true}
                    emptyIcon={ <i className="far fa-star"></i> }
                    halfIcon={ <i className="far fa-star-half"></i> }
                    fullIcon={ <i className="fas fa-star"></i> }
                    edit={false}
                />
            </div>

            <p className='text-gray-500'>
                { count } calificaciones globales
            </p>
            <div className='flex flex-col flex-wrap-reverse mt-5 gap-y-5'>

                <div className='flex w-full gap-x-3'>
                    <p className='text-xs md:text-base text-cyan-700 w-28'>5 estrellas</p>
                    <div className='w-full border rounded bg-gray-200'>
                        {
                            porcentajes.porcentaje5 ? (
                                <div className=" bg-yellow-300 h-full rounded" style={{ width: porcentajes.porcentaje5 }}></div>
                            ) : (
                                <div className=" bg-yellow-300 h-full rounded" style={{ width: '0%' }}></div>
                            )
                        }
                        
                    </div>
                    <p  className='text-xs md:text-base text-cyan-700 w-28'>
                        { porcentajes.porcentaje5 ? porcentajes.porcentaje5 : '0' }%
                    </p>
                </div>

                <div className='flex w-full gap-x-3'>
                    <p className='text-xs md:text-base text-cyan-700 w-28'>4 estrellas</p>
                    <div className='w-full border rounded bg-gray-200'>
                        {
                            porcentajes.porcentaje4 ? (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: porcentajes.porcentaje4 }}></div>
                            ) : (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: '0%' }}></div>
                            )
                        }
                    </div>
                    <p  className='text-xs md:text-base text-cyan-700 w-28'>
                        { porcentajes.porcentaje4 ? porcentajes.porcentaje4 : '0' }%
                    </p>
                </div>

                <div className='flex w-full gap-x-3'>
                    <p className='text-xs md:text-base text-cyan-700 w-28'>3 estrellas</p>
                    <div className='w-full border rounded bg-gray-200'>
                        {
                            porcentajes.porcentaje3 ? (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: porcentajes.porcentaje3 }}></div>
                            ) : (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: '0%' }}></div>
                            )
                        }
                    </div>
                    <p  className='text-xs md:text-base text-cyan-700 w-28'>
                        { porcentajes.porcentaje3 ? porcentajes.porcentaje3 : '0' }%
                    </p>
                </div>

                <div className='flex w-full gap-x-3'>
                    <p className='text-xs md:text-base text-cyan-700 w-28'>2 estrellas</p>
                    <div className='w-full border rounded bg-gray-200'>
                        {
                            porcentajes.porcentaje2 ? (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: porcentajes.porcentaje2 }}></div>
                            ) : (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: '0%' }}></div>
                            )
                        }
                    </div>
                    <p  className='text-xs md:text-base text-cyan-700 w-28'>
                        { porcentajes.porcentaje2 ? porcentajes.porcentaje2 : '0' }%
                    </p>
                </div>

                <div className='flex w-full gap-x-3'>
                    <p className='text-xs md:text-base text-cyan-700 w-28'>1 estrellas</p>
                    <div className='w-full border rounded bg-gray-200'>
                        {
                            porcentajes.porcentaje1 ? (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: porcentajes.porcentaje1 }}></div>
                            ) : (
                                <div className="bg-yellow-300 h-full rounded" style={{ width: '0%' }}></div>
                            )
                        }
                    </div>
                    <p  className='text-xs md:text-base text-cyan-700 w-28'>
                        { porcentajes.porcentaje1 ? porcentajes.porcentaje1 : '0' }%
                    </p>
                </div>   
                
            </div>
        </div>
  )
}
