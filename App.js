import React from 'react';
import { StyleSheet } from 'react-native';
import SwitchNavigator from "./navigation/switchNavigation";

export default function App() {
  return (
      <SwitchNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
