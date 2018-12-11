import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import DailyTrackerItem from './DailyTrackerItem';

class DailyTracker extends React.Component {

    render() {

        let test = [{
            id: 1,
            name: 'Pasta',
            date: 'Dec 28, 2018',
            protein: 18,
            carbs: 72,
            fat: 15,
        }]

        let renderItems = test.map((item) => <DailyTrackerItem data={item} key={item.id}/>);

        return (
        <View style={styles.main}>
            {renderItems}
        </View>
        );
    }
}

const styles = {
    main: {
        borderWidth: .5,
        borderColor: 'black',
        height: 300,
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(DailyTracker);