import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';
import MainTracker from './MainTracker';
import QuickAdd from '../forms/QuickAdd';
import AddUsdaItem from '../forms/AddUsdaItem';
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
        if (this.props.tab === 'addUsdaItem') return <View style={styles.main}><AddUsdaItem/></View>
        if (this.props.tab === 'editTrackedItem') return <View style={styles.main}><EditTrackedItem/></View>;
        if (this.props.tab === 'editItem') return <View style={styles.main}><EditItem/></View>;
        if (this.props.tab === 'settings') return <View style={styles.main}><Settings/></View>
        if (this.props.tab === 'graphs') return <View style={styles.main}><Graphs/></View>
        if (this.props.tab === 'goals') return <View style={styles.main}><Goals/></View>
    }

    render() {
        if (this.props.tab !== 'home') return this.handleTabMacros();
        const dailyData = this.getCurrentDayData();
        return (
        <View style={styles.main}>
            <MainTracker dailyData={dailyData}/>
            <DailyTracker dailyData={dailyData}/>
        </View>
        );
    }
}

const styles = {
    main: {
        // maxHeight: '77%',
        justifyContent: 'flex-start',
    }
}

const mapStateToProps = state => {
    return {
        tab: state.appState.tab,
        date: state.appState.date,
        data: state.dataReducer.data,
    }
}

export default connect(mapStateToProps)(Home);