import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.date}>December 28, 2018</Text>
        <View style={styles.macrosContainer}>
            <View style={styles.protein}>
                <Text style={styles.macroHeader}>Protein</Text>
                <Text style={styles.macroInt}>170/180</Text>
            </View>
            <View style={styles.carbs}>
                <Text style={styles.macroHeader}>Carbs</Text>
                <Text style={styles.macroInt}>170/180</Text>
            </View>
            <View style={styles.fat}>
                <Text style={styles.macroHeader}>Fat</Text>
                <Text style={styles.macroInt}>48/60</Text>
            </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  date: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  macrosContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  macroHeader: {
    textAlign: 'center',
    fontSize: 12
  },
  macroInt: {
    textAlign: 'center',
    fontSize: 12
  },
  protein: {
    backgroundColor: '#7f7',
    padding: 15,
    width: 100,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  carbs: {
    backgroundColor: '#77f',
    padding: 15,
    width: 100,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  fat: {
    backgroundColor: '#7ff',
    padding: 15,
    width: 100,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  }
});
