import React from 'react';
import { StyleSheet } from 'react-native';
// import SwitchNavigator from "./navigation/switchNavigation";
import Navigation from "./navigation/Navigation";

export default class App extends React.Component {
  render() {
    return (
      <Navigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
