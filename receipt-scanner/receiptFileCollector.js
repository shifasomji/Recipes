// import React, {useState } from 'react';
// import {StyleSheet, Text, View, Modal, Alert} from 'react-native';
// import {TextInput, Button} from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
// import react from 'react';

class receiptFileCollector  {

    uriFromCamPresent;

    uriFromGalleryPresent;

    theUri;

    constructor () {
        this.uriFromCamPresent = false;
        this.uriFromGalleryPresent = false;
        this.theUri = "./screens/IMG_4857.jpeg";
    }

    getFileUri() {
        return this.theUri
    }

    uriFromCamIsPresent() {
        return this.uriFromCamPresent
    }

    uriFromGalleryIsPresent() {
        return this.uriFromGalleryPresent
    }

   pickFromGallery = async () => {
        const granted = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
           let uploadProperties =  await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect: [1, 1],
                quality: 1
            })
            if (!uploadProperties.cancelled) {
                this.uriFromGalleryPresent = true;
                this.theUri = data.uri;
                console.log(this.theUri)
            }     
         }else {
            Alert.alert("You need to give permission to access gallery")
        }
    }

    pickFromCamera = async () => {
            const granted = await Permissions.askAsync(Permissions.CAMERA)
            if (granted) {
               let uploadProperties =  await ImagePicker.launchCameraAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:true,
                    aspect: [1, 1],
                    quality: 1
    
                })
                if (!uploadProperties.cancelled) {
                    this.uriFromCamPresent = true;
                    this.theUri = data.uri;
                    console.log(this.theUri)
                } 
                else {
                    this.uriFromCamPresent = false;
                }
    
             }else {
                Alert.alert("You need to give permission to access camera")
            }
        }

}

module.exports = receiptFileCollector;