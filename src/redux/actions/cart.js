import axios from 'axios';
import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cart';

export const addToCart = ( id, qty ) => async( dispatch, getState ) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SEIKO_API}/api/products/${ id }`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            description: data.description,
            brand: data.brand,
            category: data.category,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            image: data.image,
            price: data.price,
            countInStock: data.stock,
            product: data._id,
            qty,
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = ( productId ) => ( dispatch, getState ) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const savePaymentMethod = ( paymentMethod ) => ( dispatch ) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod
    });

}

export const saveShippingAddress = (data) => ( dispatch ) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}