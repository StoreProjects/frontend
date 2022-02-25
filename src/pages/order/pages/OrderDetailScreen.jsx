import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../../shared/loadingbox/LoadingBox';
import { MessageBox } from '../../../shared/messagebox/MessageBox';
import { ButtonPaypal } from '../../../components/order/ButtonPaypal';
import { StripeButton } from '../../../components/order/StripeButton';
import { useParams } from 'react-router-dom';
import { detailsOrder } from '../../../redux/actions/order';
export default function OrderDetailScreen() {

    const params = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;
    
    useEffect(() => {
        
        dispatch(detailsOrder(params.id));

    }, [ dispatch, params.id ]);

    return loading ? (<LoadingBox />) :
        error ? (<MessageBox >{error}</MessageBox>) :
            (
                <div className='flex flex-col'>
                    <p className='font-bold text-gray-700 mx-5 text-5xl my-8'> Detalle de Orden </p>
                    <div className='
                        flex flex-col items-start gap-y-10
                        lg:flex-row lg:gap-x-5 mx-5 lg:gap-y-0
                    '>

                        <div className='w-full lg:w-8/12 flex flex-col gap-y-5'>

                            <div className='transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>
                                <div className='mb-5'>
                                    <p className='font-bold text-gray-700 text-3xl'>Shipping</p>
                                </div>
                                <div className='mb-5'>

                                    <p className='font-bold'>Nombre completo: <span className='font-medium'>{ order.shippingAddress.fullName }</span></p>
                                </div>
                                <div className='mb-5'>
                                    <p className='font-bold'>Dirección: <span className='font-medium'>{ order.shippingAddress.address }</span></p>
                                </div>
                                <div className='mb-5'>
                                    {
                                        order.isDelivered ? (
                                            <MessageBox variant='success'>Delivered at ...</MessageBox>
                                        ) : (
                                            <MessageBox>Not Delivered</MessageBox>
                                        )
                                    }
                                </div>

                            </div>

                            <div className='transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>

                                <div className='mb-5'>
                                    <p className='font-bold text-gray-700 text-3xl'>Payment</p>
                                </div>
                                <div className='mb-5'>
                                    <p className='font-bold'>Metodo de pago: <span className='font-medium'>{ order.paymentMethod }</span></p>
                                </div>
                                <div className='mb-5'>
                                    {
                                        order.isPaid ? (
                                            <MessageBox variant='success' >Paid at { order.paidAt }</MessageBox>
                                        ) : (
                                            <MessageBox>Not Paid</MessageBox>
                                        )
                                    }
                                </div>

                            </div>
                            <div className='transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>

                                <div className='w-full overflow-auto'>

                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr>
                                                <th className='font-bold text-gray-700 text-3xl text-left pl-5 pt-5'>Productos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.orderItems.map((product, index) => (
                                                    <tr key={index} >
                                                        <td className='flex flex-row justify-between mt-8 gap-x-6'>
                                                            <img
                                                                src={`${ process.env.PUBLIC_URL }/img/${ product.image }`}
                                                                alt="Img_product"
                                                                className='mx-5'
                                                                style={{ width: '15%', height: '7rem' }}
                                                            />
                                                            <p className='w-56 break-words font-bold'>{ product.name }</p>
                                                            <p className='font-bold text-gray-700'>
                                                                { product.qty } x { product.price } = ${ product.qty * product.price }
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>


                            </div>

                        </div>

                        <div className='w-full lg:w-2/6 transition ease-linear bg-white border rounded border-green-500 hover:border-green-700 duration-200 p-5 hover:shadow-xl'>

                            <div className='flex flex-col gap-y-5'>
                                <p className='font-bold text-gray-700 text-3xl'>Sumatoria</p>
                                <p className='w-full'>Items: <span className='float-right text-gray-700 font-semibold'>{ '$' + order.itemsPrice.toFixed(2) }</span></p>
                                <p className='w-full'>Localización: <span className='float-right text-gray-700 font-semibold'>{ '$' + order.shippingPrice.toFixed(2) }</span></p>
                                <p className='w-full'>Tax: <span className='float-right text-gray-700 font-semibold'>{ order.taxPrice.toFixed(2) }</span></p>
                                <p className='w-full'>Total de la orden: <span className='float-right text-gray-700 font-semibold'>{ '$' + order.totalPrice.toFixed(2) }</span></p>
                                <p className='w-full font-bold text-gray-700 my-5'> Código de orden: <span className='font-semibold'>{ order._id }</span></p>

                                <div className='my-2 h-full'>
                                    {
                                        order.isPaid
                                        ? <></> : 
                                        (<Button order={order} />)
                                    }
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )
}

const Button = ({ order }) => {

    switch( order.paymentMethod ){
        case 'Paypal':
            return (<ButtonPaypal order={ order } />);

        case 'Stripe':
            return (<StripeButton order={ order } />);

        default:
            return (<></>);
    }

}
