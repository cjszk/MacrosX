import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { toggleTab } from '../../../actions/appState';
import globalStyles from '../../../globalStyles';

class Settings extends React.Component {

    render() {
        return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.dispatch(toggleTab('goals'))}>
                <Text style={styles.buttonText}>Goals</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = {
    main: {
        display: 'flex',
        flexDireciton: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
    },
    button: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        width: '50%',
        padding: 10
    },
    buttonText: {
        fontSize: 32,
        textAlign: 'center',
    }
}

const mapStateToProps = state => {
    return {
        tab: state.appState.tab,
        date: state.appState.date,
        data: state.dataReducer.data
    }
}

export default connect(mapStateToProps)(Settings);