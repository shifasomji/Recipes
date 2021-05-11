// This module is the screen where users can upload a receipt

import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'
// import { ReceiptProcessor } from "./ReceiptProcessor";

import {
  APPINPUTVIEW
} from "../style/constants";
import { Alert } from 'react-native';

export default class App extends React.Component {

  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }

    // launch gallery where user can select an image
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
    })
  }

  render() {
    const { photo } = this.state
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <Button 
            title="Upload Receipt from Gallery" 
            testID="upload receipt"
            onPress={this.handleChoosePhoto}
            color={APPINPUTVIEW} />

          <Button 
            title="Verify Ingredients from Receipt" 
            testID="verify receipt"
            onPress={() => Alert.alert("hello")}
            color={APPINPUTVIEW} />
        </View>
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
