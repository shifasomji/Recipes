import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReceiptScreen from "../screens/receipt";
import RecipeScreen from "../screens/recipe";
import InventoryScreen from "../screens/inventory";
import { NavigationContainer } from "@react-navigation/native";

import {
    APPBACKGROUNDCOLOR,
    APPTEXTBLUE,
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
            activeTintColor: APPTEXTBLUE,
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
                size={40}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Inventory"
            component={InventoryScreen}
            options={{
            tabBarLabel: "Inventory",
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                name="basket-fill"
                color={color}
                size={40}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Recipes"
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
        </Tab.Navigator>
    );
}