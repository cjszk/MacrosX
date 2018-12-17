import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import DailyTrackerItem from './DailyTrackerItem';
import moment from 'moment';
import globalStyles from '../../../globalStyles';
import { toggleTab } from '../../../actions/appState';

class DailyTracker extends React.Component {

    renderEmpty() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.props.dispatch(toggleTab('library'))}>
                <Text style={styles.buttonText}>Add Food</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { dailyData } = this.props;
        let renderItems = dailyData.sort((a, b) => moment(a.date).format('x') - moment(b.date).format('x')).map((item, index) => <DailyTrackerItem item={item} key={index}/>);
        if (dailyData.length === 0) renderItems = this.renderEmpty();
        return (
        <View style={styles.main}>
            <ScrollView ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}>
                {renderItems}
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        // borderWidth: .5,
        // borderColor: globalStyles.color,
        height: '48.5%',
        overflow: 'scroll'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        width: 200,
        borderWidth: .5,
        borderColor: globalStyles.color,
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 24,
    }
});

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(DailyTracker);