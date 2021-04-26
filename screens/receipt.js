import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'

import {
  APPTEXTRED,
  APPINPUTVIEW
} from "../style/constants";

export default class App extends React.Component {

  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }

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
            onPress={this.handleChoosePhoto}
            color={APPINPUTVIEW} />
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <Button 
            title="Upload Receipt from Camera" 
            onPress={this.handleChoosePhoto}
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
