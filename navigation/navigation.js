import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReceiptScreen from "../screens/receipt";
import RecipeScreen from "../screens/recipe";
import { NavigationContainer } from "@react-navigation/native";

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

const Tab = createBottomTabNavigator();

// Add more screens as necessary
function MyTabs() {
    return (
        <Tab.Navigator
        initialRoutename="Receipt" 
        tabBarOptions={{
            activeTintColor: APPTEXTRED,
            activeBackgroundColor: APPBACKGROUNDCOLOR,
            inactiveBackgroundColor: APPBACKGROUNDCOLOR,
            style: {borderTopWidth: 0}
        }}
        >
        <Tab.Screen
            name="Receipt"
            component={ReceiptScreen}
            options={{
            tabBarLabel: "Receipt",
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                name="receipt"
                color={color}
                size={size}
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
                size={size}
                /> // Default color and size: white and 20
            ),
            }}
        />
        </Tab.Navigator>
    );
}