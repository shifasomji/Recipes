import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReceiptScreen from "../screens/receipt";
import RecipeScreen from "../screens/recipe";
import InventoryScreen from "../screens/inventory";
import SignupScreen from "../screens/signup";
import { NavigationContainer } from "@react-navigation/native";

import {
    APPBACKGROUNDCOLOR,
    APPTEXTBLUE,
    APPINPUTVIEW
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
        initialRoutename="Signup" 
        tabBarOptions={{
            activeTintColor: APPINPUTVIEW,
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
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                name="receipt"
                color={color}
                size={35}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Inventory"
            component={InventoryScreen}
            options={{
            tabBarLabel: "Inventory",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                name="basket-fill"
                color={color}
                size={35}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Recipes"
            component={RecipeScreen}
            options={{
            tabBarLabel: "Recipes",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                name="food"
                color={color}
                size={35}
                /> 
            ),
            }}
        />
        <Tab.Screen
            name="Signup"
            component={SignupScreen}
            options={{
            tabBarLabel: "Sign Out",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                name="account-box"
                color={color}
                size={35}
                />
            ),
            tabBarVisible:false,
            }}
        /> 
        </Tab.Navigator>
    );
}