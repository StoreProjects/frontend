import axios from 'axios';
import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cart';
export const addToCart = ( id, qty ) => async( dispatch, getState ) => {
    const { data } = await axios.get(`/api/products/${ id }`);
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