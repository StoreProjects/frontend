import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/user';

const URL = `${process.env.REACT_APP_SEIKO_API}`;


export const signin = ( email, password ) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST,
        payload: { email, password }
    });
    try {
        const { data } = await axios.post(`${URL}/api/users/signin`,  { email, password });
        if( data ) {
            localStorage.setItem('userInfo', JSON.stringify(data));

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            });
        }
        
    } catch ( error ) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data
        })
    }
}

export const logout = () => async ( dispatch ) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_LOGOUT
    });
}