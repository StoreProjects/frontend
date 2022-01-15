import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
/*
createStore= To create a redux store.
ApplyMiddleware=
compose=Allows to show our store on the dev browser.
*/
import thunk from 'redux-thunk'; //Allows to do AJAX request in our redux actions.
import { productListReducer, productListOneReducer } from '../reducers/product';
import { cartReducer } from '../reducers/cart';
import { userLoginReducer } from '../reducers/user';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from '../reducers/order';
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'Paypal'
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productListOne: productListOneReducer,
    cart: cartReducer,
    userSignin: userLoginReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;