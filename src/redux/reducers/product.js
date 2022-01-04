import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LISTONE_REQUEST,
    PRODUCT_LISTONE_FAIL,
    PRODUCT_LISTONE_SUCCESS
} from '../constants/product';
export const productListReducer = ( state = { loading: true, products: [] }, action ) => {

    switch(action.type) {
        
        case PRODUCT_LIST_REQUEST:
            return { loading: true };

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;

    }

}

export const productListOneReducer = ( state = { loading: true, product: {} }, action ) => {

    switch(action.type) {
        
        case PRODUCT_LISTONE_REQUEST:
            return { loading: true };

        case PRODUCT_LISTONE_SUCCESS:
            return { loading: false, product: action.payload }
        
        case PRODUCT_LISTONE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;

    }

}