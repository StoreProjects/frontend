import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
/*
createStore= To create a redux store.
ApplyMiddleware=
compose=Allows to show our store on the dev browser.
*/
import thunk from 'redux-thunk'; //Allows to do AJAX request in our redux actions.
import { productListReducer, productListOneReducer } from '../reducers/product';
import { userLoginReducer } from '../reducers/user';
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
    },
};

const reducer = combineReducers({
    productList: productListReducer,
    productListOne: productListOneReducer,
    userSignin: userLoginReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;