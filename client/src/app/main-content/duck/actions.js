import types from './types.js';

const fetchCryptoAssets = (cryptoAssets) => {
    return {
        type: types.GET_ASSET,
        payload: cryptoAssets
    };
};

const fetchExchanges = (exchanges) => {
    return {
        type: types.GET_EXCHANGE,
        payload: exchanges
    };
};

export default {
    fetchCryptoAssets,
    fetchExchanges
};