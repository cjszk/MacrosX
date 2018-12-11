import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { incrementDate, decrementDate } from '../actions/appState';

class MainTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format("MM-DD-YYYY")
    }
  }

  createColorBar(total, goal, color) {
    return StyleSheet.create({
      colorBar: {
        width: String(total/goal) + '%',
        backgroundColor: color,
      }
    })
  }
  //, this.createColorBar(17, 180, 'skyblue').colorBar
  
  decrementDate() {
    this.props.dispatch(decrementDate());
  }

  incrementDate() {
    this.props.dispatch(incrementDate());
  }

  render() {
    const { date } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.date}>
          <TouchableOpacity onPress={() => this.decrementDate()}>
            <Icon
              name="chevron-left"
              type="fontawesome"
              size={40}
            />
          </TouchableOpacity>
          <Text style={styles.dateText}>{moment(date).format("MMM DD, YYYY")}</Text>
          <TouchableOpacity onPress={() => this.incrementDate()}>
            <Icon
              name="chevron-right"
              type="fontawesome"
              size={40}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.macrosContainer}>
          <View style={styles.protein}>
              <Text style={styles.macroHeader}>Protein</Text>
              <Text style={styles.macroInt}>{test.protein}/{testSettings.protein}</Text>
          </View>
          <View style={styles.carbs}>
              <Text style={styles.macroHeader}>Carbs</Text>
              <Text style={styles.macroInt}>{test.carbs}/{testSettings.carbs}</Text>
          </View>
          <View style={styles.fat}>
              <Text style={styles.macroHeader}>Fat</Text>
              <Text style={styles.macroInt}>{test.fat}/{testSettings.fat}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const test = {
  id: 1,
  name: 'Pasta',
  date: 'Dec 28, 2018',
  protein: 18,
  carbs: 72,
  fat: 15,
};

const testSettings = {
  protein: 180,
  carbs: 180,
  fat: 48,
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  dateText: {
    marginTop: 5,
    fontSize: 24,
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
    backgroundColor: 'skyblue',
    padding: 15,
    width: 100,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  carbs: {
    backgroundColor: 'orange',
    padding: 15,
    width: 100,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  fat: {
    backgroundColor: 'yellow',
    padding: 15,
    width: 100,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  }
});

const mapStateToProps = state => {
  return {
      quickAdd: state.appState.quickAdd,
      date: state.appState.date
  }
}

export default connect(mapStateToProps)(MainTracker);