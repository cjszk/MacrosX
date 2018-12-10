import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { toggleHomeView } from '../actions/appState';

class Header extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity>
          <Text style={styles.homeBtn}>(Menu)</Text>
        </TouchableOpacity>
        <Text style={styles.header}>MacrosX</Text>
        <TouchableOpacity onPress={() => this.props.dispatch(toggleHomeView())}>
          <Text style={styles.homeBtn}>(Home)</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000',
    paddingTop: '10%',
    paddingBottom: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  homeBtn: {
    color: '#fff',
  },
  header: {
    color: '#fff',
    fontSize: 32,
  }
});

const mapStateToProps = state => {
  return {
      quickAdd: state.appState.quickAdd,
  }
}

export default connect(mapStateToProps)(Header);