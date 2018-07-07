import axios from 'axios';
import actionCreators from './actions';

const fetchCryptoAssets = () => dispatch => {
    axios.get('api/v1/assets')
        .then(assets => {
            dispatch( actionCreators.fetchCryptoAssets(assets) );
        });
};

const fetchExchanges = () => dispatch => {
    axios.get('api/v1/exchanges')
        .then(exchanges => {
            dispatch( actionCreators.fetchExchanges(exchanges) );
        });
};

export default {
    fetchCryptoAssets,
    fetchExchanges
};