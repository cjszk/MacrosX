import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import Header from './components/global/Header/';
import Footer from './components/global/Footer/';
import HomeSwitch from './components/Homeswitch';
import store from './store';
import { saveData } from './actions/data';
import globalStyles from './globalStyles';

export default class App extends React.Component {

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
        const data = await AsyncStorage.getItem('data');
        store.dispatch(saveData(JSON.parse(data)));
        return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  render() {

    return (
      <Provider store={store}>
        <View style={styles.mainContainer}>
          <Header/>
          <HomeSwitch/>
        </View>
        <Footer/>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    height: '89%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: globalStyles.backgroundColor
  },

});