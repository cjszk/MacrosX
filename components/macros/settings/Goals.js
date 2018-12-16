import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { toggleTab } from '../../../actions/appState';

class Goals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'By Macros',
            protein: this.props.data.goals.protein,
            carbs: this.props.data.goals.carbs,
            fat: this.props.data.goals.fat,
            calories: this.props.data.goals.calories,
            proteinP: 0,
            carbsP: 0,
            fatP: 0,
        }
    }

    renderButtons() {
        if (this.state.selected === 'By Macros') {
            return (
                <View style={styles.buttonView}>
                    <TouchableOpacity style={[styles.button, styles.selected]}>
                        <Text style={styles.buttonText}>By Macros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({selected: 'By Calories'})}>
                        <Text style={styles.buttonText}>By Calories</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={() => this.setState({selected: 'By Macros'})}>
                    <Text style={styles.buttonText}>By Macros</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.selected]}>
                    <Text style={styles.buttonText}>By Calories</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderNutrientByInt(key) {
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
                onChangeText={(n) => {
                    if (!n.length) this.setState({[key]: 0})
                    else this.setState({[key]: parseInt(n)})
                }}/>
        </View>
        )
    };

    renderNutrientByPercent(key, amount) {
        const title = key.split('')[0].toUpperCase() + key.split('').slice(1, key.length - 1).join('');
        const macroValue = this.state[key];
        return (
        <View style={styles.macro}>
            <Text style={styles.macroText}>{title}</Text>
            <TextInput
                value={String(macroValue)}
                style={styles.macroInput}
                keyboardType='numeric'
                maxLength={3}
                onChangeText={(n) => {
                    if (!n.length) this.setState({[key]: 0})
                    else if (n > 100) this.setState({[key]: 100})
                    else this.setState({[key]: parseInt(n)})
                }}/>
            <Text style={styles.macroAmount}>{amount}g</Text>
        </View>
        )
    };

    renderByMacros() {
        const { protein, carbs, fat } = this.state;
        const calculatedCalories = (protein * 4) + (carbs * 4) + (fat * 9);
        return (
            <View style={styles.menu}>
                <View style={styles.macroRow}>
                    {this.renderNutrientByInt('protein')}
                    {this.renderNutrientByInt('carbs')}
                    {this.renderNutrientByInt('fat')}
                </View>
                <View style={styles.caloriesRow}>
                    <Text style={styles.caloriesByMacroText}>Calories: {calculatedCalories}</Text>
                </View>
            </View>
        );
    }

    renderByCalories() {
        const { proteinP, carbsP, fatP, calories } = this.state;
        const protein = Math.round((calories * (proteinP / 100)) / 4);
        const carbs = Math.round((calories * (carbsP / 100)) / 4);
        const fat = Math.round((calories * (fatP / 100)) / 9);
        return (
            <View style={styles.menu}>
                <View style={styles.caloriesRow}>
                    <View style={styles.calories}>
                        <Text style={styles.caloriesText}>Calories</Text>
                        <TextInput
                            value={String(calories)}
                            style={styles.caloriesInput}
                            keyboardType='numeric'
                            maxLength={4}
                            onChangeText={(n) => {
                                if (!n.length) this.setState({calories: 0})
                                else this.setState({calories: parseInt(n)})
                            }}/>
                    </View>
                </View>
                <View style={styles.macroRow}>
                    {this.renderNutrientByPercent('proteinP', protein)}
                    {this.renderNutrientByPercent('carbsP', carbs)}
                    {this.renderNutrientByPercent('fatP', fat)}
                </View>
                <View style={styles.showPercentView}>
                    <Text style={styles.showPercentText}>{proteinP + carbsP + fatP}%</Text>
                </View>
            </View>
        );
    }

    handleSubmit = async () => {
        const { selected } = this.state;
        if (selected === 'By Macros') {
            const { data } = this.props;
            const { protein, carbs, fat } = this.state;
            let calories = (protein * 4) + (carbs * 4) + (fat * 9);
            const newGoals = { protein, carbs, fat, calories };
            let newData = data;
            newData.goals = newGoals;
            try {
              await AsyncStorage.setItem('data', JSON.stringify(newData));
              this.props.dispatch(toggleTab('home'))
            } catch (error) {
              console.error(error);
            }
        } else {
            const { data } = this.props;
            const { proteinP, carbsP, fatP, calories } = this.state;
            if (proteinP + carbsP + fatP !== 100) return alert('When using percentages of calories, please make sure that Protein, Carbs and Fats add up to 100%. If you are looking to add macros by grams, select By Macros')
            const protein = Math.round((calories * (proteinP / 100)) / 4);
            const carbs = Math.round((calories * (carbsP / 100)) / 4);
            const fat = Math.round((calories * (fatP / 100)) / 9);
            const newGoals = { protein, carbs, fat, calories };
            let newData = data;
            newData.goals = newGoals;
            try {
              await AsyncStorage.setItem('data', JSON.stringify(newData));
              this.props.dispatch(toggleTab('home'))
            } catch (error) {
              console.error(error);
            }
        }

    }

    render() {
        let renderMenu = this.renderByMacros();
        if (this.state.selected === 'By Calories') renderMenu = this.renderByCalories();
        return (
        <View style={styles.main}>
            {this.renderButtons()}
            {renderMenu}
            <TouchableOpacity style={styles.submit} onPress={() => this.handleSubmit()}>
                <Text style={styles.submitText}>Enter</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20
    },
    buttonView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        width: '35%',
        padding: 10
    },
    buttonText: {
        fontSize: 24,
        textAlign: 'center',
    },
    selected: {
        backgroundColor: 'slategrey'
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '50%',
    },
    macroRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    caloriesRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    macroAmount: {
        textAlign: 'center',
    },
    caloriesByMacroText: {
        marginTop: 10,
        fontSize: 24,
    },
    calories: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    caloriesText: {
        alignSelf: 'center',
        marginTop: 10,
    },
    caloriesInput: {
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        marginTop: 10,
        width: 120,
        height: 40,
        textAlign: 'center',
    },
    showPercentView: {

    },
    showPercentText: {
        textAlign: 'center'
    },
    submit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 60,
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
        tab: state.appState.tab,
        date: state.appState.date,
        data: state.dataReducer.data
    }
}

export default connect(mapStateToProps)(Goals);