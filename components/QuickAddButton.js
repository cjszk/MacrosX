import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { toggleQuickAdd } from '../actions/appState';

class QuickAdd extends React.Component {

    render() {
        return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => this.props.dispatch(toggleQuickAdd())}>
                <Text style={styles.button}>Quick Add</Text>
            </TouchableOpacity>
        </View>
        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 20
    },
    button: {
        padding: 15,
        fontSize: 18,
        backgroundColor: '#7d7',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
    }
});

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(QuickAdd);