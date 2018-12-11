import moment from 'moment';
import { TOGGLE_QUICK_ADD, TOGGLE_HOME_VIEW, DECREMENT_DATE, INCREMENT_DATE } from "../actions/appState";

const initialState = {
    tab: 'home',
    date: moment().format()
}

export default function appStateReducer(state=initialState, action) {
    if (action.type === TOGGLE_QUICK_ADD) {
        return Object.assign({}, state, {
            tab: 'quickAdd'
        });
    }
    if (action.type === TOGGLE_HOME_VIEW) {
        return Object.assign({}, state, {
            tab: 'home'
        });  
    }
    if (action.type === DECREMENT_DATE) {
        return Object.assign({}, state, {
            date: moment(state.date).subtract(1, 'days')
        });
    }
    if (action.type === INCREMENT_DATE) {
        return Object.assign({}, state, {
            date: moment(state.date).add(1, 'days')
        });
    }
    return state;
} 