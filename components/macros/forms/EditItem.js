import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Text, View, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { toggleTab } from '../../../actions/appState';
import globalStyles from '../../../globalStyles';

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

    renderNutrient(key) {
        const title = key.split('')[0].toUpperCase() + key.split('').slice(1).join('');
        const macroValue = this.state[key];
        return (
        <View style={styles.macro}>
            <Text style={styles.macroText}>{title}</Text>
            <TextInput
                value={String(macroValue)}
                style={styles.macroInput}
                keyboardType='numeric'
                maxLength={3}
                onChangeText={(n) => this.setState({[key]: n})}/>
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

    handleParseInt = (macro) => parseInt(macro) ? parseInt(macro) : 0;
    
    handleSubmit = async () => {
        let { name, measurement } = this.state;
        const { date, item } = this.props;
        if (!name.length) return alert('Please name this item');
        if (!measurement.length) return alert('Please give a measurement type: Example: grams, ml');
        let { protein, carbs, fat, fiber, sugar, servingSize } = this.state;
        protein = this.handleParseInt(protein); carbs = this.handleParseInt(carbs); fat = this.handleParseInt(fat);
        fiber = this.handleParseInt(fiber); sugar = this.handleParseInt(sugar); servingSize = this.handleParseInt(servingSize);
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
        const { name, servingSize, measurement } = this.state;
        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={styles.main} extraScrollHeight={100}>
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
                        {this.renderNutrient('protein')}
                        {this.renderNutrient('carbs')}
                        {this.renderNutrient('fat')}
                        {this.renderNutrient('fiber')}
                        {this.renderNutrient('sugar')}
                    </View>
                </View>
                <View style={styles.servingsContainer}>
                    <Text style={styles.servingsText}>Serving Size: </Text>
                    <TextInput
                        style={styles.servingsNumberInput}
                        value={String(servingSize)}
                        keyboardType='numeric'
                        onChangeText={(s) => this.setState({servingSize: s})}
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
        marginTop: 10,
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
        // padding: 10,
        height: '50%',
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
        marginTop: '2%',
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