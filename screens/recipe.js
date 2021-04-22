import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Choose preferences for today's meal"
        onPress={() => Alert.alert('Preferences')}
      />

      <Button
        title="Find Recipe"
        onPress={() => Alert.alert('Recipes will be displayed')}
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
