import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

import {
  APPBACKGROUNDCOLOR,
  APPTEXTRED,
} from "../style/constants";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Show Inventory"
        onPress={() => Alert.alert('Upload your receipt from camera!')}
      />
    </View>
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
