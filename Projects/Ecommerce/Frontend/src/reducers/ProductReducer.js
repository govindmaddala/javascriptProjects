import { ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, ALL_PRODUCT_FAIL, CLEAR_ERRORS } from "../constants/ProductConstant";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.product,
                productsCount: action.payload.productCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                products: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};