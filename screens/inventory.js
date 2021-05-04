import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
// import { inventoryManager} from ""; // put path to stephanie's component
// returns list of objects, each of which has name, quantity, category

import {
  APPBACKGROUNDCOLOR,
  APPINPUTVIEW,
} from "../style/constants";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Show Inventory"
        onPress={() => Alert.alert('Upload your receipt from camera!')}
        color={APPINPUTVIEW}
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
