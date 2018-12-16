import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PieChart from 'react-native-pie-chart';
import globalStyles from '../globalStyles';

class MainTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredItems: []
    }
  }

  calculateMacros(data) {
    let protein = 0, carbs = 0, fat = 0, fiber = 0, sugar = 0;
    if (data.length > 0) data.forEach((item) => {
      protein += item.protein * item.servings;
      carbs += item.carbs * item.servings;
      fat += item.fat * item.servings;
      fiber += item.fiber * item.servings;
      sugar += item.sugar * item.servings;
    });

    const calories = (protein * 4) + (carbs * 4) + (fat * 9);

    return { protein, carbs, fat, fiber, sugar, calories };
  }

  createColorBar(percent, color) {
    let backgroundColor = color;
    let width = String(percent * 100) + '%';
    if (percent >= 1) {
      backgroundColor = 'red';
      width = '100%';
    };
    return (<Text style={{height: '100%', width, position: 'absolute', left: 0, top: 0, backgroundColor}}></Text>);
  }

  renderPie(dailyMacros) {
    return (
      <View style={styles.pieChart}>
        <PieChart
            chart_wh={250}
            series={[dailyMacros.protein, dailyMacros.carbs, dailyMacros.fat]}
            sliceColor={['#FFC0CB','#87CEEB','#FFFF00']}
          />
      </View>
    )
  }

  render() {
    const { dailyData } = this.props;
    const dailyMacros = this.calculateMacros(dailyData);
    let pie;
    if (dailyMacros.protein > 0 || dailyMacros.carbs > 0 || dailyMacros.fat > 0) pie = this.renderPie(dailyMacros);  
    return (
      <View style={styles.mainContainer}>
        <View style={styles.macrosContainer}>
          <View style={styles.protein}>
              {this.createColorBar((dailyMacros.protein/testSettings.protein), 'pink')}
              <Text style={styles.macroHeader}>Protein</Text>
              <Text style={styles.macroInt}>{Math.round(dailyMacros.protein)}/{testSettings.protein}</Text>
          </View>
          <View style={styles.carbs}>
              {this.createColorBar((dailyMacros.carbs/testSettings.carbs), 'skyblue')}
              <Text style={styles.macroHeader}>Carbs</Text>
              <Text style={styles.macroInt}>{Math.round(dailyMacros.carbs)}/{testSettings.carbs}</Text>
          </View>
          <View style={styles.fat}>
              {this.createColorBar((dailyMacros.fat/testSettings.fat), 'yellow')}
              <Text style={styles.macroHeader}>Fat</Text>
              <Text style={styles.macroInt}>{Math.round(dailyMacros.fat)}/{testSettings.fat}</Text>
          </View>
        </View>
        <View style={styles.calories}>
              {this.createColorBar((dailyMacros.calories/testSettings.calories), 'limegreen')}
              <Text style={styles.macroHeader}>Calories</Text>
              <Text style={styles.macroInt}>{Math.round(dailyMacros.calories)}/{testSettings.calories}</Text>
        </View>
        <View style={styles.misc}>
          <Text>Fiber: {dailyMacros.fiber}</Text>
          <Text>Sugar: {dailyMacros.sugar}</Text>
        </View>
        {pie}
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
  calories: 1872
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  macrosContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  macroHeader: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12
  },
  macroInt: {
    textAlign: 'center',
    fontSize: 12
  },
  protein: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: globalStyles.color,
  },
  carbs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: globalStyles.color,
  },
  fat: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: globalStyles.color,
  },
  calories: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: globalStyles.color,
    marginTop: 20,
  },
  misc: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pieChart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  return {
      quickAdd: state.appState.quickAdd,
      date: state.appState.date,
      data: state.dataReducer.data
  }
}

export default connect(mapStateToProps)(MainTracker);