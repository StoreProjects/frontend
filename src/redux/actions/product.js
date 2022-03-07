import axios from 'axios';
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_LISTONE_REQUEST,
    PRODUCT_LISTONE_SUCCESS,
    PRODUCT_LISTONE_FAIL,
    CREATE_COMMENT_PRODUCT_REQUEST,
    CREATE_COMMENT_PRODUCT_SUCCESS,
    CREATE_COMMENT_PRODUCT_FAIL,
    DELETE_COMMENT_PRODUCT_REQUEST,
    DELETE_COMMENT_PRODUCT_SUCCESS,
    DELETE_COMMENT_PRODUCT_FAIL
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

export const createComment = ( productId, text, rating ) => async( dispatch, getState ) => {

    dispatch({
        type: CREATE_COMMENT_PRODUCT_REQUEST,
    });

    try {

        const { userSignin: { userInfo } } = getState();
        
        const { data } = await axios.post(`/api/products/comment/${ productId }`, { text, rating }, {
            headers: {
                token: `${ userInfo.token }`
            }
        });
        
        dispatch({
            type: CREATE_COMMENT_PRODUCT_SUCCESS,
            payload: data
        });

    } catch ( e ) {
        
        dispatch({
            type: CREATE_COMMENT_PRODUCT_FAIL,
            payload: e.message
        });

    }

}

export const deleteComment = ( productId, commentId ) => async( dispatch, getState ) => {

    dispatch({
        type: DELETE_COMMENT_PRODUCT_REQUEST,
    });

    try {

        const { userSignin: { userInfo } } = getState();
        
        await axios.put(`/api/products/comment/${ productId }`, { commentId }, {
            headers: {
                token: `${ userInfo.token }`,
            }
        });

        dispatch({
            type: DELETE_COMMENT_PRODUCT_SUCCESS,
            payload: commentId
        });

    } catch ( error ) {
        
        dispatch({
            type: DELETE_COMMENT_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });

    }

}