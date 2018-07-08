import types from './types';

const initialState = {
    orderbook: []
};

export default (state = initialState, action) => {

    let newState = null;

    switch (action.type) {
        case types.GET_CURRENT_ORDERBOOK:
            newState = {
                ...state,
                orderbook: action.payload
            };

            break;
        default:
            newState = state;
    }

    return newState;
};