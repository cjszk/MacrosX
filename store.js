import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import appStateReducer from './reducers/appState';

const store = createStore(
    combineReducers({
        appState: appStateReducer,
    }),
    applyMiddleware(thunk)
);

export default store;