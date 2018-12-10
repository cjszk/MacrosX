import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Header from './components/Header/';
import Home from './components/Home';
import store from './store';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.mainContainer}>
          <Header/>
          <Home/>
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {

  },
});
