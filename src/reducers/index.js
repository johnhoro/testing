import { combineReducers } from 'redux';
import login from './loginReducer';
import register from './registerReducer';
import connectors from './connectorsReducer';
import queryData from './queryDataReducer'
import app from './appReducer'

const rootReducer = combineReducers({
  login, register, connectors, queryData, app
});

export default rootReducer;