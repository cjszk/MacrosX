export const TOGGLE_TAB = 'TOGGLE_TAB';
export const toggleTab = (tab) => ({
    type: TOGGLE_TAB,
    tab
});

export const ADD_ITEM = 'ADD_ITEM';
export const addItem = (item) => ({
    type: ADD_ITEM,
    item
})

export const DECREMENT_DATE = 'DECREMENT_DATE';
export const decrementDate = () => ({
    type: DECREMENT_DATE
});

export const INCREMENT_DATE = 'INCREMENT_DATE';
export const incrementDate = () => ({
    type: INCREMENT_DATE
});