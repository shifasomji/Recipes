import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appStyles } from "../style/stylesheet";

/* login.js
 * Login screen
 *
 */

export default function Login({ navigation }) {
  // states - contains info that user entered
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signUpUser - called when user presses sign up button,
  // navigates to sign up page
  signUpUser = () => {
    navigation.navigate("SignUp");
  };

  // loginUser - called when user presses login button
  // logs user in via firebase, navigates to App page (bottom tab navigator)
  loginUser = async (email, password) => {
    try {
      // set login credentials in local storage
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
        // dismisses keyboard when user presses anywhere
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
            style={{
            ...appStyles.loginContainer,
            backgroundColor: theme.APPBACKGROUNDCOLOR,
            }}
        >
            <Text style={{ ...appStyles.logo, color: theme.APPTEXTRED }}>
            FridgeMaster
            </Text>
            {/* text input fields (email, password) */}
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
                onChangeText={(text) => setPassword(text)}
            />
            </View>

            {/* login button */}
            <TouchableOpacity
            style={{
                ...appStyles.loginBtn,
                backgroundColor: theme.APPTEXTRED,
            }}
            onPress={() => this.loginUser(email.trim(), password)}
            >
            <Text
                style={{ ...appStyles.loginText, color: theme.APPTEXTBLACK }}
            >
                LOGIN
            </Text>
            </TouchableOpacity>

            {/* signup button */}
            <TouchableOpacity onPress={() => this.signUpUser()}>
            <Text
                style={{ ...appStyles.loginText, color: theme.APPTEXTBLACK }}
            >
                Signup
            </Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
}