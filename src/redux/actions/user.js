import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/user';
export const signin = ( email, password ) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST,
    });
    try {
        const { data } = await axios.post(`/api/users/signin`,  { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
    } catch ( error ) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.msg
            ? error.response.data.msg
            : error.msg,
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