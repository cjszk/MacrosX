import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Text, TouchableWithoutFeedback, View, TouchableOpacity, TextInput, Keyboard, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { toggleTab } from '../../../actions/appState';
import globalStyles from '../../../globalStyles';

class QuickAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            protein: '',
            carbs: '',
            fat: '',
            fiber: '',
            sugar: '',
            servings: '',
            servingSize: '',
            measurement: '',
        }
    }

    renderNutrient(macro, key, optional=null) {
        let optionalStyle;
        if (optional) optionalStyle = {color: 'grey'}
        const title = key.split('')[0].toUpperCase() + key.split('').slice(1).join('');
        const macroValue = this.state[key];
        return (
        <View style={styles.macro}>
            <Text style={[styles.macroText, optionalStyle]}>{title} {optional}</Text>
            <TextInput
                maxLength={3}
                value={String(macroValue)}
                style={styles.macroInput}
                keyboardType='numeric'
                placeholder='0'
                onChangeText={(n) => this.setState({[key]: n})}/>
        </View>
        )
    }

    handleParseInt = (macro) => parseInt(macro) ? parseInt(macro) : 0;

    handleSubmit = async () => {
        let { name, measurement } = this.state;
        let { date } = this.props;
        if (!name.length) name = 'Quick Added Item';
        if (!measurement.length) measurement = 'servings';
        let { protein, carbs, fat, fiber, sugar, servings, servingSize } = this.state;
        if (!servings) return alert('Please enter the amount of servings to be consumed.')
        const { data } = this.props;
        protein = this.handleParseInt(protein); carbs = this.handleParseInt(carbs); fat = this.handleParseInt(fat);
        fiber = this.handleParseInt(fiber); sugar = this.handleParseInt(sugar); servings = this.handleParseInt(servings); servingSize = this.handleParseInt(servingSize);
        const newEntry = { name, protein, carbs, fat, fiber, sugar, servings, measurement, date, servingSize };
        // Copy of data.entries - add new entry
        const newEntries = data.entries.slice();
        newEntries.push(newEntry);
        // Copy of data - replace with new entries
        let newData = data;
        newData.entries = newEntries;
        try {
          await AsyncStorage.setItem('data', JSON.stringify(newData));
          this.props.dispatch(toggleTab('home'))
        } catch (error) {
          console.error(error);
        }
    }

    render() {
        const { name, protein, carbs, fat, fiber, sugar, servings, measurement, servingSize } = this.state;
        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={styles.main} extraScrollHeight={100}>
                <View style={styles.mainContainer}>
                    <Text style={styles.header}>Quick Add</Text>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>Name: </Text>
                        <TextInput
                            value={name}
                            onChangeText={(e) => this.setState({name: e})}
                            style={styles.nameInput}
                            placeholder="Name (optional for Quick Add)"
                        />
                    </View>
                </View>
                <View style={styles.nutrientsContainer}>
                    <View style={styles.macroContainer}>
                        {this.renderNutrient(protein, 'protein')}
                        {this.renderNutrient(carbs, 'carbs')}
                        {this.renderNutrient(fat, 'fat')}
                        {this.renderNutrient(fiber, 'fiber', '(optional)')}
                        {this.renderNutrient(sugar, 'sugar', '(optional)')}
                    </View>
                </View>
                <View style={styles.servingsContainer}>
                    <View style={styles.servingsContainerSecondary}>
                        <Text style={styles.servingsText}>Serving Size: </Text>
                        <TextInput
                            style={styles.servingsSizeInput}
                            value={String(servingSize)}
                            keyboardType='numeric'
                            placeholder='30'
                            onChangeText={(s) => this.setState({servingSize: s})}
                        />
                        <TextInput
                            value={measurement.toLowerCase()}
                            style={styles.servingsMeasurementInput}
                            placeholder="(grams etc.)"
                            onChangeText={(m) => this.setState({measurement: m})}
                        />
                    </View>
                    <View style={styles.servingsContainerSecondary}>
                        <Text style={styles.servingsText}>Servings: </Text>
                        <TextInput
                            style={styles.servingsNumberInput}
                            value={String(servings)}
                            keyboardType='numeric'
                            placeholder='1'
                            onChangeText={(s) => this.setState({servings: s})}
                        />
                    </View>
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.submit}onPress={() => this.handleSubmit()}>
                        <Text style={styles.submitText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        )
    }
}
const styles = {
    main: {
        height: '100%',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: '10%',
        marginRight: '10%',
        height: '15%',
        padding: 10,
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
        height: '49.25%',
    },
    macroContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10,
    },
    macro: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    macroText: {
        alignSelf: 'center',
        marginTop: '1%',
        width: '25%'
    },
    macroInput: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        marginTop: 10,
        width: 60,
        height: 40,
        textAlign: 'center',
    },
    servingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        height: '20%'
    },
    servingsContainerSecondary: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
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
        marginLeft: 5,
        marginRight: 5,
        width: 60,
        height: '80%',
        textAlign: 'center',
    },
    servingsSizeInput: {
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        marginLeft: 5,
        marginRight: 5,
        width: 60,
        height: '80%',
        textAlign: 'center',

    },
    servingsMeasurementInput: {
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        height: '80%',
        width: 120,
    },
    submitContainer: {
        height: '15%',
    },
    submit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
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