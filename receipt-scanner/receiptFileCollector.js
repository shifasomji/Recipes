/**
 * 
 * This class is accessed bythe UI to guide the process of picking a 
 *  receipt file by lauching the camera to take a photo
 * or by choosing from the existing photos in the gallery, 

 * For each picker method, we'll first request permission to access
 * the camera or gallery from the user and proceed upon receiving authorisation

 * The receiptURI from this class is accessed by ReceiptDataExtractor for use as a parameter
 * in the veryfi API. 
 */

// run install for the image picker package
// https://docs.expo.io/versions/latest/sdk/imagepicker/


import React, {useState } from 'react';
import {StyleSheet, Text, View, Modal, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import receiptDataExtractor from '../receipt-scanner/receiptDataExtractor';


class receiptFileCollector  {
    uriFromCamPresent;
    uriFromGalleryPresent;
    theUri;

    constructor () {
        this.uriFromCamPresent = false;
        this.uriFromGalleryPresent = false;
        this.theUri = "" //"./screens/IMG_4857.jpeg";
        this.extractor = new receiptDataExtractor(this.theUri);
    }
    /**
     * This is an async method that launches the camera to allow a user to get a photo for a receipt 
     * it sets the imageUri after a photo has been captured and the user has not cancelled the operation 
     */
    
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
                this.theUri = uploadProperties.uri;
                this.extractor.theReceiptUri = this.theUri;
            }  else {
                this.uriFromGalleryPresent= false;
                Alert.alert("You cancelled this operation")
            }   
         }else {
            Alert.alert("You need to give permission to access gallery")
        }

        console.log(this.extractor.makeVeryfiRequest());
    }
    /**
     * This is an async method that launches the gallery to allow a user to select a photo for a receipt
     * it sets the imageUri if a photo is selected and the user has not cancelled the operation 
     */

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
                    Alert.alert("You cancelled this operation")
                    this.uriFromCamPresent = false;
                }
             }else {
                Alert.alert("You need to give permission to access camera")
            }
        }

    /**
     * 
     * @returns the uri as a string
     */

    getFileUri() {
        return this.theUri
    }
    /**
     * One of the methods i created to facilitate TDD
     * @returns boolean for testing collected uri from camera
     */

    uriFromCamIsPresent() {
        return this.uriFromCamPresent
    }
    /**
     * One of the methods i created to facilitate TDD
     * @returns boolean for testing collected uri from camera
     */

    uriFromGalleryIsPresent() {
        return this.uriFromGalleryPresent
    }

}

export default receiptFileCollector;