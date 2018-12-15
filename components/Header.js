import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { toggleHomeView } from '../actions/appState';

class Header extends React.Component {
  
  renderMenu() {
    return (
      <View>
        <Text style={styles.menuBar}></Text>
        <Text style={styles.menuBar}></Text>
        <Text style={styles.menuBar}></Text>
      </View>);
  }
  
  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity>
          {this.renderMenu()}
        </TouchableOpacity>
        <Text style={styles.header}>MacrosX</Text>
        <TouchableOpacity onPress={() => this.props.dispatch(toggleHomeView())}>
        <View
          style={styles.homeBtn}
          >
          <Icon
            name='home'
            type='font-awesome'
            color='black'
            size={50}
          />
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    backgroundColor: '#4C9FFE',
    paddingTop: 40,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '11%',
  },
  menuBar: {
    width: 50,
    height: 5,
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
  },
  homeBtn: {
    marginRight: 15,
  },
  header: {
    color: 'black',
    fontSize: 32,
  }
});

const mapStateToProps = state => {
  return {
      quickAdd: state.appState.quickAdd,
  }
}

export default connect(mapStateToProps)(Header);