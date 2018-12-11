import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

class DailyTrackerItem extends React.Component {

    render() {
        const { data } = this.props;

        return (
            <View style={[styles.flexRow, styles.main]}>
                <View style={styles.flexColumn}>
                    <Text style={styles.text}>{data.name}</Text>
                    <Text style={styles.text}>{data.date}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'skyblue',

                    }]}>{data.protein}g</Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'orange',

                    }]}>{data.carbs}g</Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'yellow',

                    }]}>{data.fat}g</Text>
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
        padding: .5,
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
    text: {
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