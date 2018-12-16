import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import globalStyles from '../globalStyles';
import { addItem } from '../actions/appState';

class LibraryItem extends React.Component {

    render() {
        const { item } = this.props;
        return (
            <View key={item.date} style={styles.main}>
                <View style={styles.name}>
                    <Text>{item.name}</Text>
                    <Text>{item.servingSize} {item.measurement}</Text>
                </View>
                <View style={styles.macros}>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'pink',
                    }]}>{item.protein}g</Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'skyblue',
                    }]}>{item.carbs}g</Text>
                    <Text style={[styles.macronutrient, {
                        backgroundColor: 'yellow',
                    }]}>{item.fat}g</Text>
                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.icons} onPress={() => this.props.dispatch(addItem(item))}>
                        <Icon
                            name="add"
                            type="antdesign"
                            size={35}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icons}>
                        <Icon
                            name="edit"
                            type="antdesign"
                            size={35}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 60,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
    },
    name: {
        width: '25%',
    },
    macros: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',

    },
    macronutrient: {
        paddingTop: '12.5%',
        width: 50,
        height: '100%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    buttonsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '25%',
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
        library: state.dataReducer.data.library
    }
}

export default connect(mapStateToProps)(LibraryItem);