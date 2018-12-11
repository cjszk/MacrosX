import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

class QuickAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            protein: '0',
            carbs: '0',
            fat: '0',
            fiber: '0',
            sugar: '0',
            toggleTimePicker: false,
            date: moment(),
        }
    }

    showDateTimePicker = () => this.setState({ toggleTimePicker: true });

    hideDateTimePicker = () => this.setState({ toggleTimePicker: false });
  
    handleDatePicked = (date) => {
        this.setState({date})
        this.hideDateTimePicker();
    };

    renderMacro(macro, key, backgroundColor) {
        if (!backgroundColor) backgroundColor = 'none';
        const title = key.split('')[0].toUpperCase() + key.split('').slice(1).join('');
        return (
        <View style={[styles.macroContainer, {
            backgroundColor
        }]}>
            <Text style={styles.macroLabel}>{title}</Text>
            <View style={styles.macroInputView}>
                <TouchableOpacity
                    onPress={() => {
                    if (parseInt(macro) > 0) this.setState({[key]: String(parseInt(macro) - 1)})}}
                    style={styles.macroInputArrow}>
                    <Icon size={40} name='minus' type='entypo'/>
                </TouchableOpacity>
                <TextInput
                    value={macro}
                    style={styles.macroInput}
                    keyboardType='numeric'
                    onChangeText={(n) => this.setState({[key]: n})}    
                />
                <TouchableOpacity
                    onPress={() => this.setState({[key]: String(parseInt(macro) + 1)})}
                    style={styles.macroInputArrow}>
                    <Icon size={40} name='plus' type='entypo'/>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    renderMisc(misc, key) {
        return (
        <View style={styles.extraContainer}>
            <Text style={styles.extraLabel}>Fiber</Text>
            <Text style={styles.optional}>(optional)</Text>
            <View style={styles.extraInputView}>
                <TouchableOpacity
                    onPress={() => {
                    if (parseInt(misc) > 0) this.setState({[key]: String(parseInt(misc) - 1)})}}
                style={styles.extraInputArrow}>
                    <Icon size={40} name='minus' type='entypo'/>
                </TouchableOpacity>
                <TextInput
                    value={misc}
                    style={styles.extraInput}
                    keyboardType='numeric'
                    onChangeText={(n) => this.setState({[key]: n})} />
                <TouchableOpacity
                    onPress={() => this.setState({[key]: String(parseInt(misc) + 1)})}
                    style={styles.extraInputArrow}>
                    <Icon size={40} name='plus' type='entypo'/>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    render() {
        const { name, protein, carbs, fat, fiber, sugar, date } = this.state;
        return (
            <View style={styles.main}>
                <DateTimePicker
                    isVisible={this.state.toggleTimePicker}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    />

                <Text style={styles.header}>Quick Add</Text>
                <View style={styles.nameView}>
                    <TextInput
                    style={styles.nameInput}
                    placeholder='Name (of food)'
                    value={name}
                    onChangeText={(name) => this.setState({name})}
                    />
                </View>
                <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                    <Text style={styles.datePicker}>{moment(date).format('MMM DD, YYYY')}</Text>
                </TouchableOpacity>
                {this.renderMacro(protein, 'protein', 'skyblue')}
                {this.renderMacro(carbs, 'carbs', 'orange')}
                {this.renderMacro(fat, 'fat', 'yellow')}
                <View style={styles.extra}>
                    {this.renderMisc(fiber, 'fiber')}
                    {this.renderMisc(sugar, 'sugar')}
                </View>
                <TouchableOpacity>
                    <Text style={styles.submit}>Enter</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = {
    main: {
        marginTop: 20,
    },
    header: {
        marginBottom: 20,
        marginLeft: 20,
        fontSize: 32,
    },
    nameView: {

    },
    nameText: {
        fontSize: 18,
    },
    nameInput: {
        padding: 5,
        width: 220,
        height: 50,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        marginTop: 10,
        marginLeft: 20,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        fontSize: 24,
    },
    datePicker: {
        textAlign: 'center',
        fontSize: 24,
        padding: 5,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        width: 220,
    },
    macroLabel: {
        fontSize: 24,
        marginBottom: 10,
    },
    macroContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    macroInputView: {
        display: 'flex',
        flexDirection: 'row',
    },
    macroInputArrow: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        textAlign: 'center',

    },
    macroInput: {
        width: 75,
        textAlign: 'center',
        fontSize: 24,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    extraLabel: {
        fontSize: 24,
        marginBottom: 10,
    },
    extra: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optional: {
        fontSize: 12,
    },
    extraContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    extraInputView: {
        display: 'flex',
        flexDirection: 'row',
    },
    extraInputArrow: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        textAlign: 'center',

    },
    extraInput: {
        width: 75,
        textAlign: 'center',
        fontSize: 24,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    submit: {
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: '#aaa',
        padding: 20,
        width: 300,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
    },
    
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
        date: state.appState.date,
    }
}

export default connect(mapStateToProps)(QuickAdd);