import types from './types';

const initialState = {
    asset: {success: true, data: []},
    exchange: {success: true, data: []}
};

export default (state = initialState, action) => {

    let newState = null;

    switch (action.type) {
        case types.GET_ASSET:
            newState = {
                ...state,
                asset: action.payload
            };

            break;
        case types.GET_EXCHANGE:
            newState = {
                ...state,
                exchange: action.payload
            };

            break;
        default:
            newState = state;
    }

    return newState;
};