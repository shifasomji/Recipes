import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const LoginScreen = ({ navigation }) => {

    const [name, onChangeName] = React.useState(null);  
    const [password, onChangePass] = React.useState(null);  

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <TextInput
            onChangeText={onChangeName}
            value={name}
            placeholder="Username"
            keyboardType="numeric"
        />

        <TextInput
            onChangeText={onChangePass}
            value={password}
            placeholder="Password"
            keyboardType="numeric"
        />

        <Button
            title="Log in"
            onPress={() => navigation.navigate('Receipt')}
        />
        </View>
    );
};

export default LoginScreen;