// This module is the screen where users can upload a receipt

import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'
import receiptFileCollector from "../receipt-scanner/receiptFileCollector";

import {
  APPINPUTVIEW
} from "../style/constants";
import { Alert } from 'react-native';

export default class App extends React.Component {

  constructor(){
    super()
    this.receiptFile = new receiptFileCollector();
  }

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
    return (
      <View style={styles.container}>

          <Button 
            title="Upload Receipt from Gallery" 
            testID="upload receipt gallery"
            onPress={() => this.receiptFile.pickFromGallery()}
            color={APPINPUTVIEW} />

          <Button 
            title="Verify Ingredients from Receipt" 
            testID="verify receipt"
            onPress={() => Alert.alert("hello")}
            color={APPINPUTVIEW} />
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
