import axios from 'axios';
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_SUCCESS,
} from '../constants/order';
import { CART_EMPTY } from '../constants/cart';
import { OrdersMine } from '../services/order-service/order';
export const createOrder = ( order ) => async ( dispatch, getState ) => {

    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    });

    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post('/api/order', order, {
            headers: {
                token: `${ userInfo.token }`
            }
        });

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        });
        dispatch({
            type: CART_EMPTY
        });
        localStorage.removeItem('cartItems');
    } catch ( error ) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }

}

export const detailsOrder = ( orderId ) => async ( dispatch, getState ) => {

    dispatch({
        type: ORDER_DETAILS_REQUEST,
        payload: orderId
    });

    try {

        const { userSignin: { userInfo } } = getState();
        
        const { data } = await axios.get(`/api/order/${ orderId }`, {
            headers: {
                token: `${ userInfo.token }`
            }
        });

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch ( error ) {
        
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    }

}

export const payOrder = ( order, paymentResult ) => async ( dispatch, getState ) => {

    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: {
            order,
            paymentResult
        }
    });

    const { userSignin: { userInfo } } = getState();

    try {
        
        const { data } = await axios.put(`/api/order/${ order._id }/pay`, paymentResult, {
            headers: {
                token: `${ userInfo.token }`
            }
        });

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });

    } catch ( error ) {
        
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    }
    
}

export const payOrderStripe = ( order, paymentResult ) => async ( dispatch, getState ) => {

    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: {
            order,
            paymentResult
        }
    });

    const { userSignin: { userInfo } } = getState();

    try {
        
        const { data } = await axios.put(`/api/order/${ order._id }/stripe`, paymentResult, {
            headers: {
                token: `${ userInfo.token }`
            }
        });

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });

    } catch ( error ) {
        
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    }
    
}

export const listOrdermine = () => async( dispatch, getState ) => {

    dispatch({
        type: ORDER_MINE_LIST_REQUEST
    });

    const { userSignin: { userInfo } } = getState();

    try {
        
        const orders = await OrdersMine( userInfo );

        dispatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload: orders,
        });

    } catch ( error ) {
        dispatch({
            type: ORDER_MINE_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}