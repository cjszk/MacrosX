import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import MainTracker from './MainTracker';
import QuickAddButton from './QuickAddButton';
import QuickAdd from './QuickAdd';
import DailyTracker from './DailyTracker';

class Home extends React.Component {

    render() {
        if (this.props.tab === 'quickAdd') return <View><QuickAdd/></View>;
        return (
        <View style={styles.main}>
            <MainTracker/>
            <DailyTracker/>
            <QuickAddButton/>
        </View>
        );
    }
}

const styles = {
    main: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    }
}

const mapStateToProps = state => {
    return {
        tab: state.appState.tab,
    }
}

export default connect(mapStateToProps)(Home);