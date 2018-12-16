import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { toggleHomeView } from '../actions/appState';
import { incrementDate, decrementDate } from '../actions/appState';
import globalStyles from '../globalStyles';

class Header extends React.Component {

  decrementDate() {
    this.props.dispatch(decrementDate());
  }

  incrementDate() {
    this.props.dispatch(incrementDate());
  }

  render() {
    const { date } = this.props;
    let renderDate = moment(date).format("ddd MMM DD, YYYY");
    if (moment(date).format("MMM DD, YYYY") == moment().format("MMM DD, YYYY")) renderDate = 'Today';
    if (moment(date).format("MMM DD, YYYY") == moment().subtract(1, 'days').format("MMM DD, YYYY")) renderDate = 'Yesterday';
    if (moment(date).format("MMM DD, YYYY") == moment().add(1, 'days').format("MMM DD, YYYY")) renderDate = 'Tomorrow';
    
    return (
      <View style={styles.main}>
          <TouchableOpacity onPress={() => this.decrementDate()}>
            <Icon
              name="chevron-left"
              type="fontawesome"
              size={60}
            />
          </TouchableOpacity>
          <Text style={styles.dateText}>{renderDate}</Text>
          <TouchableOpacity onPress={() => this.incrementDate()}>
            <Icon
              name="chevron-right"
              type="fontawesome"
              size={60}
            />
          </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    backgroundColor: '#4C9FFE',
    paddingTop: 40,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '11%',
  },
  dateText: {
    alignSelf: 'center',
    fontSize: 32,
    width: '70%',
    textAlign: 'center',
  },
  header: {
    color: globalStyles.color,
    fontSize: 32,
  }
});

const mapStateToProps = state => {
  return {
      quickAdd: state.appState.quickAdd,
      date: state.appState.date,
  }
}

export default connect(mapStateToProps)(Header);