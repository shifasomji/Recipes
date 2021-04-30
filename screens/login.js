import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  APPBACKGROUNDCOLOR,
  APPTEXTRED,
} from "../style/constants";
import { appStyles } from "../style/stylesheet";

/* signup.js
 * SignUp screen
 *
 */

export default function SignUp({ navigation }) {
  // states - contains info that user entered
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // signUpUser - called when user presses sign up button
  // if passwords match, signs user up (and logs them in) and navigates to App
  signUpUser = async (email, password, confirmPassword, name) => {
    try {
      // if user enters same passwords
      if (password == confirmPassword) {
        // save login credentials in local storage
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("password", password);        
      } else {
        // if passwords don't match alert user
        console.log("passwords dont match");
        Alert.alert("Oops!", "your passwords don't match", [{ text: "OK" }]);
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
        // if user taps anywhere keyboard goes away
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
            style={{
            ...styles.container,
            backgroundColor: theme.APPBACKGROUNDCOLOR,
            }}
        >
            {/* logo text */}
            <Text style={{ ...styles.logo, color: theme.APPTEXTRED }}>
            Sign Up
            </Text>

            {/* name text input */}
            <View
            style={{
                ...appStyles.inputView,
                backgroundColor: theme.APPINPUTVIEW,
            }}
            >
            <TextInput
                style={appStyles.inputText}
                placeholder="Name..."
                placeholderTextColor="#003f5c"
                autoCorrect={false}
                onChangeText={(text) => {
                setName(text);
                }}
            />
            </View>

            {/* email text input */}
            <View
            style={{
                ...appStyles.inputView,
                backgroundColor: theme.APPINPUTVIEW,
            }}
            >
            <TextInput
                style={appStyles.inputText}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                keyboardType="email-address"
                onChangeText={(text) => {
                setEmail(text);
                }}
            />
            </View>

            {/* password text input */}
            <View
            style={{
                ...appStyles.inputView,
                backgroundColor: theme.APPINPUTVIEW,
            }}
            >
            <TextInput
                secureTextEntry
                style={appStyles.inputText}
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                onChangeText={(text) => {
                setPassword(text);
                }}
            />
            </View>

            {/* confirm password text input */}
            <View
            style={{
                ...appStyles.inputView,
                backgroundColor: theme.APPINPUTVIEW,
            }}
            >
            <TextInput
                secureTextEntry
                style={appStyles.inputText}
                placeholder="Confirm password..."
                placeholderTextColor="#003f5c"
                onChangeText={(text) => {
                setConfirmPassword(text);
                }}
            />
            </View>
            {/* sign up button */}
            <TouchableOpacity
            style={{
                ...appStyles.loginBtn,
                backgroundColor: theme.APPTEXTRED,
            }}
            onPress={() =>
                this.signUpUser(
                email.trim(),
                password,
                confirmPassword,
                name.trim()
                )
            }
            >
            <Text
                style={{ ...appStyles.loginText, color: theme.APPTEXTBLACK }}
            >
                SIGN UP
            </Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APPBACKGROUNDCOLOR,
    alignItems: "center",
    paddingTop: 20,
  },

  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: APPTEXTRED,
    marginBottom: 20,
    marginTop: 80,
  },
});