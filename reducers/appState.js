import { TOGGLE_QUICK_ADD, TOGGLE_HOME_VIEW } from "../actions/appState";

const initialState = {
    quickAdd: false
}
const homeState = {
    quickAdd: false
}

export default function appStateReducer(state=initialState, action) {
    if (action.type === TOGGLE_QUICK_ADD) {
        return Object.assign({}, state, {
            quickAdd: !state.quickAdd 
        });
    }
    if (action.type === TOGGLE_HOME_VIEW) {
        return Object.assign({}, state, homeState);  
    }
    return state;
} 