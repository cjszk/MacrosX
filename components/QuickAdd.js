import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

class QuickAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            protein: '0',
            carbs: '0',
            fat: '0'
        }
    }

    render() {
        const { protein, carbs, fat } = this.state;
        return (
            <View style={styles.main}>
                <Text style={styles.header}>Quick Add</Text>
                <View style={styles.macroContainer}>
                    <Text style={styles.macroLabel}>Protein</Text>
                    <View style={styles.macroInputView}>
                        <TouchableOpacity
                        onPress={() => {
                            if (parseInt(protein) > 0) this.setState({protein: String(parseInt(protein) - 1)})}
                        }
                        style={styles.macroInputArrow}>
                            <Text>L</Text>
                        </TouchableOpacity>
                        <TextInput
                            value={protein}
                            style={styles.macroInput}
                            keyboardType='numeric'
                            onChangeText={(n) => this.setState({protein: n})}    
                        />
                        <TouchableOpacity
                        onPress={() => this.setState({protein: String(parseInt(protein) + 1)})}
                        style={styles.macroInputArrow}>
                            <Text>R</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.macroContainer}>
                    <Text style={styles.macroLabel}>Carbs</Text>
                    <View style={styles.macroInputView}>
                        <TouchableOpacity
                        onPress={() => {
                            if (parseInt(carbs) > 0) this.setState({carbs: String(parseInt(carbs) - 1)})}
                        }
                        style={styles.macroInputArrow}>
                            <Text>L</Text>
                        </TouchableOpacity>
                        <TextInput
                            value={carbs}
                            style={styles.macroInput}
                            keyboardType='numeric'
                            onChangeText={(n) => this.setState({carbs: n})}    
                        />
                        <TouchableOpacity
                        onPress={() => this.setState({carbs: String(parseInt(carbs) + 1)})}
                        style={styles.macroInputArrow}>
                            <Text>R</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.macroContainer}>
                    <Text style={styles.macroLabel}>Fat</Text>
                    <View style={styles.macroInputView}>
                        <TouchableOpacity
                        onPress={() => {
                            if (parseInt(fat) > 0) this.setState({fat: String(parseInt(fat) - 1)})}
                        }
                        style={styles.macroInputArrow}>
                            <Text>L</Text>
                        </TouchableOpacity>
                        <TextInput
                            value={fat}
                            style={styles.macroInput}
                            keyboardType='numeric'
                            onChangeText={(n) => this.setState({fat: n})}    
                        />
                        <TouchableOpacity
                        onPress={() => this.setState({fat: String(parseInt(fat) + 1)})}
                        style={styles.macroInputArrow}>
                            <Text>R</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = {
    main: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    header: {
        marginBottom: 30,
        fontSize: 24,
        textAlign: 'center',
    },
    macroLabel: {
        fontSize: 24,
        marginBottom: 10,
    },
    macroContainer: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
    },
    macroInputView: {
        display: 'flex',
        flexDirection: 'row',
    },
    macroInputArrow: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 25,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
    },
    macroInput: {
        width: 75,
        height: 75,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 18,
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
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
    }
}

export default connect(mapStateToProps)(QuickAdd);