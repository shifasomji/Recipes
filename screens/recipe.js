import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import {
  APPINPUTVIEW
} from "../style/constants";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Choose preferences for today's meal"
        onPress={() => Alert.alert('Preferences')}
        color={APPINPUTVIEW}
      />

      <Button
        title="Select Diet"
        onPress={() => Alert.alert('Diet')}
        color={APPINPUTVIEW}
      />

      <Button
        title="Select ingredients to exclude from today's meal"
        onPress={() => Alert.alert('Exclude')}
        color={APPINPUTVIEW}
      />

      <Button
        title="Select allergy causing ingredients"
        onPress={() => Alert.alert('Intolerances')}
        color={APPINPUTVIEW}
      />

      <Button
        title="Find Recipe"
        onPress={() => Alert.alert('Recipes will be displayed')}
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
