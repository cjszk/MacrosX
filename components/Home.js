import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import MainTracker from './MainTracker';
import QuickAddButton from './QuickAddButton';
import QuickAdd from './QuickAdd';

class Home extends React.Component {

    render() {
        console.log(this.state)
        if (this.props.quickAdd) return <View><QuickAdd/></View>;
        return (
        <View>
            <MainTracker/>
            <QuickAddButton/>
        </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(Home);