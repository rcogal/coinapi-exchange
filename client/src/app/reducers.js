import { combineReducers } from 'redux';
import  mainContentReducer  from './main-content/duck/reducers'

const rootReducer = combineReducers({
    mainContent: mainContentReducer
});

export default rootReducer;