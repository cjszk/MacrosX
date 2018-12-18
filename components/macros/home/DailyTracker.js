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
            <ScrollView style={styles.main} ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}>
                {renderItems}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        // position: 'absolute',
        height: '25.2%',
        // bottom: '7.65%',
        // left: 0,
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        width: '50%',
        backgroundColor: globalStyles.colors.two
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18
    }
});

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(DailyTracker);