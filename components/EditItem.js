import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { toggleTab } from '../actions/appState';
import globalStyles from '../globalStyles';

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            protein: this.props.item.protein,
            carbs: this.props.item.carbs,
            fat: this.props.item.fat,
            fiber: this.props.item.fiber,
            sugar: this.props.item.sugar,
            servingSize: this.props.item.servingSize,
            measurement: this.props.item.measurement,
        }
    }

    renderNutrient(macro, key) {
        const title = key.split('')[0].toUpperCase() + key.split('').slice(1).join('');
        const macroValue = this.state[key];
        return (
        <View style={styles.macro}>
            <Text style={styles.macroText}>{title}</Text>
            <TextInput
                value={String(macroValue)}
                style={styles.macroInput}
                keyboardType='numeric'
                onChangeText={(n) => {
                    if (!n.length) this.setState({[key]: 0})
                    else this.setState({[key]: parseInt(n)})
                }}/>
        </View>
        )
    }

    deleteItem = async () => {
        const { item, data } = this.props;
        let newData = data;
        const newEntries = newData.library.filter((i) => {
            if (i !== item) return i;
        })
        newData.library = newEntries;
        try {
          await AsyncStorage.setItem('data', JSON.stringify(newData));
          this.props.dispatch(toggleTab('home'))
        } catch (error) {
          console.error(error);
        }
    }

    handleSubmit = async () => {
        let { name, measurement } = this.state;
        const { date, item } = this.props;
        if (!name.length) return alert('Please name this item');
        if (!measurement.length) return alert('Please give a measurement type: Example: grams, ml');
        const { protein, carbs, fat, fiber, sugar, servingSize } = this.state;
        const { data } = this.props;
        const newEntry = { name, protein, carbs, fat, fiber, sugar, servingSize, measurement, date };
        const newEntries = data.library.slice();
        let newData = data;
        newData.library = newEntries.map((i) => {
            if (i === item) return newEntry;
            return i;
        });;
        try {
          await AsyncStorage.setItem('data', JSON.stringify(newData));
          this.props.dispatch(toggleTab('library'))
        } catch (error) {
          console.error(error);
        }
    }

    render() {
        const { name, protein, carbs, fat, fiber, sugar, servingSize, measurement } = this.state;
        return (
            <View style={styles.main}>
                <View style={styles.mainContainer}>
                    <Text style={styles.header}>{name}</Text>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>Name: </Text>
                        <TextInput
                            value={name}
                            onChangeText={(e) => this.setState({name: e})}
                            style={styles.nameInput}
                            placeholder="Name (required)"
                        />
                    </View>
                </View>
                <View style={styles.nutrientsContainer}>
                    <View style={styles.macroContainer}>
                        {this.renderNutrient(protein, 'protein')}
                        {this.renderNutrient(carbs, 'carbs')}
                        {this.renderNutrient(fat, 'fat')}
                    </View>
                    <View style={styles.miscContainer}>
                        {this.renderNutrient(fiber, 'fiber')}
                        {this.renderNutrient(sugar, 'sugar')}
                    </View>
                </View>
                <View style={styles.servingsContainer}>
                    <Text style={styles.servingsText}>Serving Size: </Text>
                    <TextInput
                        style={styles.servingsNumberInput}
                        value={String(servingSize)}
                        keyboardType='numeric'
                        onChangeText={(s) => {
                            if (!s.length) this.setState({servingSize: 0})
                            else {
                                const value = parseInt(s);
                                this.setState({servingSize: value})
                            }
                        }}
                    />
                    <TextInput
                        value={measurement.toLowerCase()}
                        style={styles.servingsMeasurementInput}
                        placeholder="Ex: grams..."
                        onChangeText={(m) => this.setState({measurement: m})}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.delete}onPress={() => this.deleteItem()}>
                        <Icon name='trash' type='entypo' size={60}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit}onPress={() => this.handleSubmit()}>
                        <Text style={styles.submitText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = {
    main: {
        height: '78%',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 10,
        padding: 10,
        height: '30%'
    },
    header: {
        fontSize: 32,
        alignSelf: 'center'
    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'left',  
    },
    nameText: {
        fontSize: 18,
        padding: 10,
        width: '30%'
    },
    nameInput: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        marginTop: 10,
        width: '70%'
    },
    nutrientsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10,
    },
    macroContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    macro: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    macroText: {
        alignSelf: 'center',
        marginTop: 10,
    },
    macroInput: {
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        marginTop: 10,
        width: 60,
        height: 40,
        textAlign: 'center',
    },
    miscContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: '16.67%',
        marginRight: '16.67%',
    },
    servingsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    servingsText: {
        fontSize: 18,
        padding: 10,
        alignSelf: 'center'
    },
    servingsNumberInput: {
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 60,
        height: 40,
        textAlign: 'center',

    },
    servingsMeasurementInput: {
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 120,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 60,
    },
    submit: {
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        width: '50%'
    },
    submitText: {
        textAlign: 'center',
        fontSize: 18
    },
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
        date: state.appState.date,
        data: state.dataReducer.data,
        item: state.appState.targetItem,
    }
}

export default connect(mapStateToProps)(NewItem);