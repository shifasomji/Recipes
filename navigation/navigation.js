import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReceiptScreen from "../screens/receipt";
import RecipeScreen from "../screens/recipe";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    APPBACKGROUNDCOLOR,
    APPTEXTRED,
} from "../style/constants";


export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

// Add more screens as necessary
function MyTabs() {
    return (
        <Drawer.Navigator
        initialRoutename="Receipt" 
        tabBarOptions={{
            activeTintColor: APPTEXTRED,
            activeBackgroundColor: APPBACKGROUNDCOLOR,
            inactiveBackgroundColor: APPBACKGROUNDCOLOR,
            style: {borderTopWidth: 0}
        }}
        >
        <Drawer.Screen
            name="Receipt"
            component={ReceiptScreen}
            options={{
            tabBarLabel: "Receipt",
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                name="receipt"
                color={color}
                size={40}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Recipe"
            component={RecipeScreen}
            options={{
            tabBarLabel: "Recipes",
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                name="food"
                color={color}
                size={40}
                /> // Default color and size: white and 20
            ),
            }}
        />
        </Drawer.Navigator>
    );
}

// export default MyTabs;