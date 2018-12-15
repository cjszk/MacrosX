import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class DailyTrackerItem extends React.Component {

    render() {
        const { data } = this.props;

        return (
            <View style={[styles.flexRow, styles.main]}>
                <View style={styles.flexColumn}>
                    <Text style={styles.textName}>{data.name}</Text>
                    <Text style={styles.textServings}>{data.servings} {data.measurement}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'skyblue',
                    }]}>{data.protein * data.servings}g</Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'orange',
                    }]}>{data.carbs * data.servings}g</Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'yellow',
                    }]}>{data.fat * data.servings}g</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    main: {
        backgroundColor: 'limegreen',
        borderWidth: 0.5,
        borderColor: 'black',
    },
    flexRow: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    flexColumn: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    textName: {
        fontSize: 18,
        marginBottom: 2,
        marginTop: 2,
        marginLeft: 5,
        marginRight: 5,
    },
    textServings: {
        marginBottom: 2,
        marginTop: 2,
        marginLeft: 5,
        marginRight: 5,
    },
    macronutrient: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        width: 50,
        height: '100%',
        textAlign: 'center',
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(DailyTrackerItem);