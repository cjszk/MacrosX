import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Picker } from 'react-native';
import { toggleTab } from '../../../actions/appState';
import globalStyles from '../../../globalStyles';

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nutrients: this.props.item.nutrients,
            nutrientIndex: this.props.item.nutrients[0].measures.length-1,
            servings: '',
            servingSize: this.props.item.nutrients[0].measures[0].qty,
            measurement: this.props.item.nutrients[0].measures[0].label,
            equivalent: 100,
            proteinPerGram: 0,
            carbsPerGram: 0,
            fatPerGram: 0,
        }
    }

    renderNutrient(macro, key, color='#000') {
        const title = key.split('')[0].toUpperCase() + key.split('').slice(1).join('');
        let { servings } = this.state;
        if (!servings) servings = 0;
        const amount = Number(parseInt(macro * servings)) ? String(parseInt(macro * servings)) : 0;
        return (
        <View style={styles.macro}>
            <Text style={styles.macroText}>{title}</Text>
            <Text style={[styles.macroInt, {color}]}>{amount}</Text>
        </View>
        )
    }

    handleParseInt = (macro) => parseInt(macro) ? parseInt(macro) : 0;

    handleSubmit = async (protein, carbs, fat, fiber, sugar) => {
        const { item, date, data } = this.props;
        const { servings, measurement } = this.state;
        let { servingSize } = this.state;
        const name = item.desc.name;
        protein = this.handleParseInt(protein); carbs = this.handleParseInt(carbs); fat = this.handleParseInt(fat);
        fiber = this.handleParseInt(fiber); sugar = this.handleParseInt(sugar); servingSize = this.handleParseInt(servingSize);
        const newEntry = { name, protein, carbs, fat, fiber, sugar, servings, measurement, date, servingSize };
        const newLibraryEntry = { name, protein, carbs, fat, fiber, sugar, date, servingSize, measurement }
        // Copy of data.entries - add new entry
        const newEntries = data.entries.slice();
        const newLibraryEntries = data.library.slice();
        newEntries.push(newEntry);
        newLibraryEntries.push(newLibraryEntry);
        // Copy of data - replace with new entries
        let newData = data;
        newData.entries = newEntries;
        newData.library = newLibraryEntries;
        try {
          await AsyncStorage.setItem('data', JSON.stringify(newData));
          this.props.dispatch(toggleTab('home'))
        } catch (error) {
          console.error(error);
        }
    }

    componentDidMount() {
        const { item } = this.props;
        item.nutrients.forEach((nutrient) => {
            if (nutrient.measures.length === 0) return null;
            if (nutrient.name === "Protein") this.setState({proteinPerGram: (nutrient.measures[0].value / nutrient.measures[0].eqv)});
            if (nutrient.name === "Carbohydrate, by difference") this.setState({carbsPerGram: (nutrient.measures[0].value / nutrient.measures[0].eqv)});
            if (nutrient.name === "Total lipid (fat)") this.setState({fatPerGram: (nutrient.measures[0].value / nutrient.measures[0].eqv)});
            if (nutrient.name === "Fiber, total dietary)") this.setState({fiberPerGram: (nutrient.measures[0].value / nutrient.measures[0].eqv)});
            if (nutrient.name === "Sugars, total") this.setState({sugarPerGram: (nutrient.measures[0].value / nutrient.measures[0].eqv)});
        });

    }

    renderMeasurements() {
        const { nutrients } = this.state;
        return nutrients[0].measures.map((m) => 
                <Picker.Item key={`${m.qty} ${m.label}`} label={`${m.qty} ${m.label}`} value={`${m.qty} ${m.label.split(' ').join('-')} ${m.eqv}`}/>
        );
    }

    render() {
        const { servings, servingSize, measurement, 
            selected, proteinPerGram, carbsPerGram, fatPerGram, fiberPerGram, sugarPerGram, equivalent } = this.state;
        const { item } = this.props;
        const protein = proteinPerGram * equivalent;
        const fat = fatPerGram * equivalent;
        const carbs = carbsPerGram * equivalent
        const fiber = fiberPerGram ? fiberPerGram * equivalent : 0;
        const sugar = sugarPerGram ? sugarPerGram * equivalent : 0;
        const renderServingSize = servings? parseInt(servings * servingSize * 10)/10 : 0;

        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
                <View style={styles.mainContainer}>
                    <Text style={styles.header}>{item.desc.name}</Text>
                </View>
                <Picker style={styles.picker} selectedValue={selected} 
                onValueChange={(itemValue, nutrientIndex) => {
                    this.setState({selected: itemValue, servingSize: itemValue.split(' ')[0], measurement: itemValue.split(' ')[1], equivalent: itemValue.split(' ')[2], nutrientIndex})}
                }
                    >
                    {this.renderMeasurements()}
                    <Picker.Item key="100 grams" label="100 grams" value="100 grams 100"/>
                </Picker>
                <View style={styles.servingsContainer}>
                    <Text style={styles.servingsText}>Servings: </Text>
                    <TextInput
                        autoFocus={true}
                        style={styles.servingsNumberInput}
                        value={String(servings)}
                        keyboardType='numeric'
                        placeholder='0'
                        maxLength={4}
                        onChangeText={(s) => this.setState({servings: s})}
                    />
                    <Text style={styles.measurement}>{Number(parseInt(renderServingSize*10)/10) ? String(parseInt(renderServingSize*10)/10) : '0'} {measurement.split('-').join(' ')}</Text>
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
                <TouchableOpacity style={styles.submit}onPress={() => this.handleSubmit(protein, carbs, fat, fiber, sugar)}>
                    <Text style={styles.submitText}>Enter</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
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
        fontSize: 18,
        width: '100%',
        alignSelf: 'center',
    },
    picker: {
        marginBottom: '-13.5%',
        marginTop: '-13.5%',
        // height: '20%',
        zIndex: -5,
    }, 
    nutrientsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // padding: 10,
    },
    macroContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // padding: 10,
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
        height: 35,
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
    submit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        // marginTop: '2%',
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
})

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
        item: state.appState.targetItem,
        date: state.appState.date,
        data: state.dataReducer.data
    }
}

export default connect(mapStateToProps)(AddItem);