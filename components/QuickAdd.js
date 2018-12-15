import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { toggleHomeView } from '../actions/appState';

class QuickAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            sugar: 0,
            servings: 1,
            measurement: '',
            toggleTimePicker: false,
            date: moment(),
        }
    }

    showDateTimePicker = () => this.setState({ toggleTimePicker: true });

    hideDateTimePicker = () => this.setState({ toggleTimePicker: false });
  
    handleDatePicked = (date) => {
        this.setState({date: moment(date).format()})
        this.hideDateTimePicker();
    };

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

    handleSubmit = async () => {
        let { name, measurement } = this.state;
        if (!name.length) name = 'Quick Add: ' + String(moment().format('hh:ss a'));
        if (!measurement.length) measurement = 'servings';
        const { protein, carbs, fat, fiber, sugar, date, servings } = this.state;
        const { data } = this.props;
        const newEntry = { name, protein, carbs, fat, fiber, sugar, servings, measurement };
        const newEntries = data.entries.slice()
        newEntries.push(newEntry);
        let newData = data;
        newData.entries = newEntries;
        newData.date = moment(date).format('x');
        console.log(newEntry);
        try {
          await AsyncStorage.setItem('data', JSON.stringify(newData));
          this.props.dispatch(toggleHomeView())
        } catch (error) {
          console.error(error);
        }
    }

    render() {
        const { name, protein, carbs, fat, fiber, sugar, date, servings, measurement } = this.state;
        return (
            <View style={styles.main}>
                <DateTimePicker
                    isVisible={this.state.toggleTimePicker}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
                <View style={styles.mainContainer}>
                    <Text style={styles.header}>Quick Add</Text>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>Name: </Text>
                        <TextInput
                            onChangeText={(e) => this.setState({name: e})}
                            style={styles.nameInput}
                            placeholder="Name (optional for Quick Add)"
                        />
                    </View>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>Date: </Text>
                        <TouchableOpacity style={styles.datePicker} onPress={() => this.showDateTimePicker()}>
                            <Text>{moment(date).format('MMM DD, YYYY')}</Text>
                        </TouchableOpacity>
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
                    <Text style={styles.servingsText}>Servings: </Text>
                    <TextInput
                        style={styles.servingsNumberInput}
                        value={String(servings)}
                        keyboardType='numeric'
                        onChangeText={(s) => {
                            if (!s.length) this.setState({servings: 0})
                            else {
                                const value = parseInt(s);
                                this.setState({servings: value})
                            }
                        }}
                    />
                    <TextInput
                        value={measurement.toLowerCase()}
                        style={styles.servingsMeasurementInput}
                        placeholder="(optional)"
                        onChangeText={(m) => this.setState({measurement: m})}
                    />
                </View>
                <TouchableOpacity style={styles.submit}onPress={() => this.handleSubmit()}>
                    <Text style={styles.submitText}>Enter</Text>
                </TouchableOpacity>
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
    datePicker: {
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
        borderColor: '#000',
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
        borderColor: '#000',
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
        borderColor: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 120,
    },
    submit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 60,
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        width: '50%'
    },
    submitText: {
        textAlign: 'center',
        fontSize: 18
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
        date: state.appState.date,
        data: state.dataReducer.data
    }
}

export default connect(mapStateToProps)(QuickAdd);