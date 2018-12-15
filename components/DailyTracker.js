import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View } from 'react-native';
import DailyTrackerItem from './DailyTrackerItem';
import moment from 'moment';

class DailyTracker extends React.Component {

    render() {
        const { dailyData } = this.props;
        let renderItems = dailyData.sort((a, b) => {
            return moment(a.date).format('e') - moment(b.date).format('e')
        }).map((item, index) => <DailyTrackerItem data={item} key={index}/>);

        return (
        <View style={styles.main}>
            <ScrollView>
                {renderItems}
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        borderWidth: .5,
        borderColor: 'black',
        height: '60%',
        overflow: 'scroll'
    }
});

console.log(StyleSheet.create)

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(DailyTracker);