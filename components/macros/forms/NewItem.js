import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { toggleTab } from '../../../actions/appState';
import globalStyles from '../../../globalStyles';

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            protein: '',
            carbs: '',
            fat: '',
            fiber: '',
            sugar: '',
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
                value={String(macroValue)}
                style={styles.macroInput}
                keyboardType='numeric'
                maxLength={3}
                placeholder='0'
                onChangeText={(n) => {
                    this.setState({[key]: n})
                }}/>
        </View>
        )
    }

    handleParseInt = (macro) => parseInt(macro) ? parseInt(macro) : 0;

    handleSubmit = async () => {
        let { name, measurement } = this.state;
        let { date } = this.props;
        if (!name.length) return alert('Please name this item');
        if (!measurement.length) return alert('Please give a measurement type: Example: grams, ml');
        let { protein, carbs, fat, fiber, sugar, servingSize } = this.state;
        protein = this.handleParseInt(protein); carbs = this.handleParseInt(carbs); fat = this.handleParseInt(fat);
        fiber = this.handleParseInt(fiber); sugar = this.handleParseInt(sugar); servingSize = this.handleParseInt(servingSize);
        const { data } = this.props;
        const newEntry = { name, protein, carbs, fat, fiber, sugar, servingSize, measurement, date };
        // Copy of data.entries - add new entry
        const newEntries = data.library.slice();
        newEntries.push(newEntry);
        // Copy of data - replace with new entries
        let newData = data;
        newData.library = newEntries;
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={styles.main} extraScrollHeight={100}>
                <View style={styles.mainContainer}>
                    <Text style={styles.header}>New Food Item</Text>
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
                        {this.renderNutrient(fiber, 'fiber', '(optional)')}
                        {this.renderNutrient(sugar, 'sugar', '(optional)')}
                    </View>
                </View>
                <View style={styles.servingsContainer}>
                    <Text style={styles.servingsText}>Serving Size: </Text>
                    <TextInput
                        style={styles.servingsNumberInput}
                        value={String(servingSize)}
                        keyboardType='numeric'
                        placeholder='1'
                        onChangeText={(s) => {
                            this.setState({servingSize: s})
                        }}
                    />
                    <TextInput
                        value={measurement.toLowerCase()}
                        style={styles.servingsMeasurementInput}
                        placeholder="Ex: grams..."
                        onChangeText={(m) => this.setState({measurement: m})}
                    />
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
        height: '55%',
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
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        height: '20%'
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
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

export default connect(mapStateToProps)(NewItem);