import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrdermine } from '../../../redux/actions/order';
export default function OrderHistoryScreen() {
    const dispatch = useDispatch();
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    useEffect(() => {
        dispatch(listOrdermine());
    }, [dispatch]);
    return (
        <div className='container px-4 my-5'>
            {loading ? (<div>Cargando</div>) : error ? (<div>{error}</div>) : (
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagado</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entregado</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {
                                orders.map((item, index) => (
                                    <tr key={index} className='px-6 py-4 whitespace-nowrap'>
                                        <td className='px-6 py-4 whitespace-nowrap'>{item._id}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{item.createdAt.substring(0, 10)}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{'$ ' + item.totalPrice.toFixed(2)}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{item.isPaid ? item.paidAt.substring(0, 10) : 'No'}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {item.isDelivered
                                                ? item.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <Link
                                                to={`/orderDetail/${ item._id }`}
                                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                            >
                                                Detalle
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
