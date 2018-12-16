import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';
import MainTracker from './MainTracker';
import QuickAdd from '../forms/QuickAdd';
import DailyTracker from './DailyTracker';
import Library from '../library/Library';
import NewItem from '../forms/NewItem';
import AddItem from '../forms/AddItem';
import EditTrackedItem from '../forms/EditTrackedItem';
import EditItem from '../forms/EditItem';
import Settings from '../settings/Settings';
import Graphs from '../graphs/Graphs';
import Goals from '../settings/Goals';

class Home extends React.Component {

    getCurrentDayData() {
        let results = [];
        if (Object.keys(this.props.data).length) {
          results = this.props.data.entries.filter((item) => {
            if (moment(this.props.date).format('MM-DD-YYYY') === moment(item.date).format('MM-DD-YYYY')) {
              return item; 
            }
          })
        }
        return results;
    }

    handleTabMacros() {
        if (this.props.tab === 'quickAdd') return <View style={styles.main}><QuickAdd/></View>;
        if (this.props.tab === 'library') return <View style={styles.main}><Library/></View>;
        if (this.props.tab === 'newItem') return <View style={styles.main}><NewItem/></View>;
        if (this.props.tab === 'addItem') return <View style={styles.main}><AddItem/></View>;
        if (this.props.tab === 'editTrackedItem') return <View style={styles.main}><EditTrackedItem/></View>;
        if (this.props.tab === 'editItem') return <View style={styles.main}><EditItem/></View>;
        if (this.props.tab === 'settings') return <View style={styles.main}><Settings/></View>
        if (this.props.tab === 'graphs') return <View style={styles.main}><Graphs/></View>
        if (this.props.tab === 'goals') return <View style={styles.main}><Goals/></View>
    }

    handleTabWorkouts() {
        return (
            <View><Text>Under Construction</Text></View>
        )
    }

    renderMacros() {
        if (this.props.tab !== 'home') return this.handleTabMacros();
        const dailyData = this.getCurrentDayData();
        return (
        <View style={styles.main}>
            <MainTracker dailyData={dailyData}/>
            <DailyTracker dailyData={dailyData}/>
        </View>
        );
    }

    renderWorkouts() {
        if (this.props.tab !== 'home') return this.handleTabWorkouts();
        const dailyData = this.getCurrentDayData();
        return (
        <View style={styles.main}>
            <Text>Under Construction</Text>
        </View>
        );
    }

    render() {
        const { mode } = this.props;
        if (mode === 'workouts') return this.renderWorkouts();
        else return this.renderMacros();
    }
}

const styles = {
    main: {
        height: '78%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    }
}

const mapStateToProps = state => {
    return {
        tab: state.appState.tab,
        date: state.appState.date,
        data: state.dataReducer.data,
        mode: state.appState.mode,
    }
}

export default connect(mapStateToProps)(Home);