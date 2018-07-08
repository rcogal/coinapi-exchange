import axios from 'axios';
import actionCreators from './actions';

const fetchCurrentOrderbook = (data={}) => dispatch => {

    console.log('{}', data)

    var resourcePath = data.baseQuote + '/' + data.assetQuote + '/' + data.symbolIds + '/' + data.liquidity;

    return axios.get('api/v1/orderbook/current/'+ resourcePath)
        .then( orderbooks => dispatch(actionCreators.fetchCurrentOrderbook(orderbooks)))
        .catch( err => err );
};

export default { fetchCurrentOrderbook };