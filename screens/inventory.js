// This module is a screen that displays the user's current inventory

import React from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';
//import { inventoryManager } from "../inventory-manager/InventoryManager"; 
// returns list of objects, each of which has name, quantity, category

import {
  APPINPUTVIEW,
} from "../style/constants";

export default class Inventory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Show Inventory"
          testID="show inventory"
          onPress={}
          color={APPINPUTVIEW}
        />
      </View>
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
