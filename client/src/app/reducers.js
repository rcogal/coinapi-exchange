import { combineReducers } from 'redux';
import  mainContentReducer  from './main-content/duck/reducers'
import exchangeDataTableReducer from './exchange-data-table/duck/reducers';

const rootReducer = combineReducers({
    metadata: mainContentReducer,
    orderbook: exchangeDataTableReducer
});

export default rootReducer;