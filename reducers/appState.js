import moment from 'moment';
import { DECREMENT_DATE, INCREMENT_DATE, TOGGLE_TAB, ADD_ITEM } from "../actions/appState";

const initialState = {
    tab: 'home',
    date: moment().format(),
    addItem: {}
}

export default function appStateReducer(state=initialState, action) {
    if (action.type === TOGGLE_TAB) {
        return Object.assign({}, state, {
            tab: action.tab
        });
    }
    if (action.type === ADD_ITEM) {
        return Object.assign({}, state, {
            addItem: action.item,
            tab: 'addItem'
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