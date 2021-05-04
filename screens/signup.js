import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { APPTEXTRED } from "../style/constants";

const navigationByCondition = (pass, confirmPass, navigation) => {
    if (pass == confirmPass) {
        navigation.navigate('Receipt');
    } 
  };

const LoginScreen = ({ navigation }) => {

    const [name, onChangeName] = useState(null);  
    const [password, onChangePass] = useState(null);
    const [confirmPass, onChangeConfirmPass] = useState(null);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <TextInput
            onChangeText={onChangeName}
            value={name}
            placeholder="Username"
            keyboardType="default"
        />

        <TextInput
            onChangeText={onChangePass}
            value={password}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
        />

        <TextInput
            onChangeText={onChangeConfirmPass}
            value={confirmPass}
            placeholder="Confirm Password"
            keyboardType="default"
            secureTextEntry={true}
        />

        <Button
            title="Signup"
            onPress={() => navigationByCondition(password, confirmPass, navigation)}
            color={APPTEXTRED}
        />
        </View>
    );
};

export default LoginScreen;