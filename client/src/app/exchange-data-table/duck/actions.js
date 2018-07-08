import types from './types.js';

const fetchCurrentOrderbook = (orderbooks) => {
    return {
        type: types.GET_CURRENT_ORDERBOOK,
        payload: orderbooks
    };
};


export default { fetchCurrentOrderbook };