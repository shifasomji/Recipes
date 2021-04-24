import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

import {
  APPTEXTRED,
  APPINPUTVIEW
} from "../style/constants";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Upload Receipt from Camera"
        onPress={() => Alert.alert('Upload your receipt from camera!')}
        color={APPINPUTVIEW}
      />

      <Button
        title="Upload Receipt from Gallery"
        onPress={() => Alert.alert('Upload your receipt from photo gallery!')}
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
