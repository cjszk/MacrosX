import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { SAVE_DATA } from '../actions/data';

const initialState = {
    data: {}
}

export default function appStateReducer(state=initialState, action) {
    if (action.type === SAVE_DATA) {
        return Object.assign({}, state, {
            data: action.data
        });
    }
    return state;
} 

const data = {
    library: [{
        name: 'Pasta',
        protein: 5,
        carbs: 42,
        fat: 7,
        fiber: 0,
        sugar: 0,
    }],
    entries: [
        {
            date: 1544852141637,
            name: 'Pasta',
            protein: 5,
            carbs: 42,
            fat: 7,
            fiber: 0,
            sugar: 0,
            servings: 1.5,
            measurement: 'grams',
        },
        {
            date: 1544852141638,
            name: 'Whey Protein',
            protein: 30,
            carbs: 1,
            fat: 1,
            fiber: 0,
            sugar: 0,
            servings: 2,
            measurement: 'grams'
        },
        {
            date: 1544852141639,
            name: 'Banana',
            protein: 2,
            carbs: 42,
            fat: 2,
            fiber: 0,
            sugar: 0,
            servings: 1.0,
            measurement: 'grams',
        },
        {
            date: 1544852141640,
            name: 'Almonds',
            protein: 5,
            carbs: 8,
            fat: 11,
            fiber: 0,
            sugar: 0,
            servings: .5,
            measurement: 'grams'
        },
        {
            date: 1544852141642,
            name: 'Almonds',
            protein: 5,
            carbs: 8,
            fat: 11,
            fiber: 0,
            sugar: 0,
            servings: .5,
            measurement: 'grams'
        },
        {
            date: 1544852141643,
            name: 'Banana',
            protein: 2,
            carbs: 42,
            fat: 2,
            fiber: 0,
            sugar: 0,
            servings: 1.0,
            measurement: 'grams'
        },
    ],
}

storeData = async () => {
    try {
        console.log('this ran')
      await AsyncStorage.setItem('data', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
}

storeData();