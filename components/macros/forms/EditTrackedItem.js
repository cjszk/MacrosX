import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { toggleTab } from '../../../actions/appState';
import globalStyles from '../../../globalStyles';

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            protein: '',
            carbs: '',
            fat: '',
            fiber: '',
            sugar: '',
            servings: this.props.item.servings,
            measurement: '',
        }
    }

    renderNutrient(macro, key, color='#000') {
        const title = key.split('')[0].toUpperCase() + key.split('').slice(1).join('');
        const { servings } = this.state;
        return (
        <View style={styles.macro}>
            <Text style={styles.macroText}>{title}</Text>
            <Text style={[styles.macroInt, {color}]}>{String(parseInt(macro * servings))}</Text>
        </View>
        );
    }

    deleteItem = async () => {
        const { item, data } = this.props;
        let newData = data;
        const newEntries = newData.entries.filter((i) => {
            if (i !== item) return i;
        })
        newData.entries = newEntries;
        try {
          await AsyncStorage.setItem('data', JSON.stringify(newData));
          this.props.dispatch(toggleTab('home'))
        } catch (error) {
          console.error(error);
        }
    }

    handleParseInt = (macro) => parseInt(macro) ? parseInt(macro) : 0;

    handleSubmit = async () => {
        const { item, date, data } = this.props;
        const { servings } = this.state;
        let { protein, carbs, fat, fiber, sugar, measurement, name, servingSize } = item;
        protein = this.handleParseInt(protein); carbs = this.handleParseInt(carbs); fat = this.handleParseInt(fat);
        fiber = this.handleParseInt(fiber); sugar = this.handleParseInt(sugar); servingSize = this.handleParseInt(servingSize);
        const newEntry = { name, protein, carbs, fat, fiber, sugar, servings, measurement, date, servingSize };
        let newData = data;
        const newEntries = newData.entries.map((i) => {
            if (i === item) return newEntry;
            return i;
        })
        newData.entries = newEntries;
        try {
          await AsyncStorage.setItem('data', JSON.stringify(newData));
          this.props.dispatch(toggleTab('home'))
        } catch (error) {
          console.error(error);
        }
    }

    render() {
        const { servings } = this.state;
        const { item } = this.props;
        const { protein, carbs, fat, fiber, sugar, measurement, name } = item;

        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={styles.main} extraScrollHeight={100}>
                <View style={styles.mainContainer}>
                    <Text style={styles.header}>{name}</Text>
                </View>
                <View style={styles.servingsContainer}>
                    <Text style={styles.servingsText}>Servings: </Text>
                    <TextInput
                        autoFocus={true}
                        style={styles.servingsNumberInput}
                        value={String(servings)}
                        keyboardType='numeric'
                        onChangeText={(s) => this.setState({servings: s})}
                    />
                    <Text style={styles.measurement}>{measurement}</Text>
                </View>
                <View style={styles.nutrientsContainer}>
                    <View style={styles.macroContainer}>
                        {this.renderNutrient(protein, 'protein', globalStyles.proteinColor)}
                        {this.renderNutrient(carbs, 'carbs', globalStyles.carbColor)}
                        {this.renderNutrient(fat, 'fat', globalStyles.fatColor)}
                        {this.renderNutrient(fiber, 'fiber')}
                        {this.renderNutrient(sugar, 'sugar')}
                    </View>
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
    nutrientsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10,
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
    macroInt: {
        alignSelf: 'center',
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
    measurement: {
        alignSelf: 'center',
        marginLeft: 10,
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
        item: state.appState.targetItem,
        date: state.appState.date,
        data: state.dataReducer.data
    }
}

export default connect(mapStateToProps)(AddItem);