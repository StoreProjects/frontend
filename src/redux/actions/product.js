import axios from 'axios';
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_LISTONE_REQUEST,
    PRODUCT_LISTONE_SUCCESS,
    PRODUCT_LISTONE_FAIL
} 
from '../constants/product';

export const listProducts = () => async (dispatch) => {
    
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        
        const { data } = await axios.get(`/api/products/`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });

    } catch ( error ) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }

}

export const listOneProduct = ( id ) => async ( dispatch ) => {

    dispatch({
        type: PRODUCT_LISTONE_REQUEST
    });

    try {
        
        const { data } = await axios.get(`/api/products/${ id }`);

        dispatch({
            type: PRODUCT_LISTONE_SUCCESS,
            payload: data
        })

    } catch ( e ) {
        dispatch({
            type: PRODUCT_LISTONE_FAIL,
            payload: e.message
        })
    }
    
}