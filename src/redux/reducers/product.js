import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LISTONE_REQUEST,
    PRODUCT_LISTONE_FAIL,
    PRODUCT_LISTONE_SUCCESS,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    CREATE_COMMENT_PRODUCT_REQUEST,
    CREATE_COMMENT_PRODUCT_SUCCESS,
    CREATE_COMMENT_PRODUCT_FAIL,
    DELETE_COMMENT_PRODUCT_SUCCESS,
    DELETE_COMMENT_PRODUCT_FAIL,
    DELETE_COMMENT_PRODUCT_REQUEST,
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


const INITIAL_STATE = {
    //product
    loading: true,
    product: {
        _id: '',
        name: '',
        description: '',
        category: '',
        brand: '',
        price: 0,
        image: '',
        stock: 0,
        comments: []
    },
    error: '',
    //comment
    success: false,
    load: true,
    e: '',
    loadD: true,
    ex: ''
}

export const productListOneReducer = ( state = INITIAL_STATE, action ) => {

    switch(action.type) {
        
        case PRODUCT_LISTONE_REQUEST:
            return {
                ...state,
                loading: true                
            };

        case PRODUCT_LISTONE_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        
        case PRODUCT_LISTONE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CREATE_COMMENT_PRODUCT_REQUEST:
            return {
                ...state,
                load: true
            }

        case CREATE_COMMENT_PRODUCT_SUCCESS:
            return {
                ...state,
                load: false,
                product: {
                    ...state.product,
                    comments: [ action.payload, ...state.product.comments ]
                }
            }

        case CREATE_COMMENT_PRODUCT_FAIL:
            return {
                load: false,
                e: action.payload
            }

        case DELETE_COMMENT_PRODUCT_REQUEST:
            return {
                ...state,
                loadD: true,
            }

        case DELETE_COMMENT_PRODUCT_SUCCESS:
            const comment = action.payload;
            return {
                ...state,
                loadD: false,
                product: {
                    ...state.product,
                    comments: [ ...state.product.comments.filter((i) => i._id !== comment) ]
                }
            }

        case DELETE_COMMENT_PRODUCT_FAIL:
            return {
                ...state,
                ex: action.payload
            }

        default:
            return state;

    }

}

export const productListCateReducer = ( state = { loading: true, error: '', products: [] }, action ) => {

    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }

        case PRODUCT_CATEGORY_LIST_FAIL:
            return {
                ...state,
                loading: true,
                error: action.payload
            }
    
        default:
            return state;
    }

}