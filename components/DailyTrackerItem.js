import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

class DailyTrackerItem extends React.Component {

    render() {
        const { data } = this.props;

        return (
            <View style={[styles.flexRow, styles.main]}>
                <View style={styles.name}>
                    <Text style={styles.textName}>{data.name}</Text>
                    <Text style={styles.textServings}>{data.servings} {data.measurement}</Text>
                </View>
                <View style={[styles.flexRow, styles.macros]}>
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
                <View style={styles.icons}>
                    <Icon
                        name="edit"
                        type="antdesign"
                        size={35}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    main: {
        // backgroundColor: 'limegreen',
        borderWidth: 0.5,
        borderColor: 'black',
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