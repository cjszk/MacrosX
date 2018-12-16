import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import globalStyles from '../globalStyles';
import { editTrackedItem } from '../actions/appState';

class DailyTrackerItem extends React.Component {

    render() {
        const { item } = this.props;

        return (
            <View style={[styles.flexRow, styles.main]}>
                <View style={styles.name}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <Text style={styles.textServings}>{item.servings} {item.measurement}</Text>
                </View>
                <View style={[styles.flexRow, styles.macros]}>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'pink',
                    }]}>
                        <Text>{item.protein * item.servings}g</Text>
                    </Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'skyblue',
                    }]}>
                        <Text>{item.carbs * item.servings}g</Text>
                    </Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'yellow',
                    }]}>
                        <Text>{item.fat * item.servings}g</Text>
                    </Text>
                </View>
                <TouchableOpacity style={styles.icons} onPress={() => this.props.dispatch(editTrackedItem(item))}>
                    <Icon
                        name="edit"
                        type="antdesign"
                        size={35}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    main: {
        // backgroundColor: 'limegreen',
        borderWidth: 0.5,
        borderColor: globalStyles.color,
    },
    flexRow: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    name: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '40%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
    },
    textName: {
        fontSize: 16,
        marginBottom: 2,
        marginTop: 2,
    },
    textServings: {
        marginBottom: 2,
        marginTop: 2,
        marginLeft: 5,
        marginRight: 5,
    },
    macros: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '15%',
    },
    macronutrient: {
        paddingTop: '25%',
        width: 50,
        height: '100%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 10,
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(DailyTrackerItem);