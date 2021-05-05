// This module verifies the list of ingredients used by the user in the recipe
// These ingredients will be deducted from the user's inventory
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { inventoryManager } from ""; // put in path to stephanie's class

var verifiedIngredients = [];

const verifyIngredients = (recipeIngredients, navigation) => {
    /*
        ask user to verify ingredients used in recipe
        user will be shown a list of ingredients and their quantities in the recipe
        - this information will be provided by spoonacular api
        - it will be of the form [[name, quantity, unit], [name, quantity, unit]]

        TO DO: ask lucky to send units of each ingredient

        create verifiedIngredients (return variable), which is equal to recipeIngredients
        user will then be able to update quantities of any items
        if user makes any changes to quantities:
            - store changes 
            - update quantities of ingredients in verifiedIngredients
        user will also be able to add/remove ingredients
        if user makes any changes to ingredients:
            - store changes
            - update ingredients in verifiedIngredients
        call reduceInventory() in the inventory-manager component
        @param recipeIngredients: list of ingredients used in recipe
        @output verifiedIngredients: verified list of ingredients
    */

    // TO DO: ask lucky whether recipeIngredients is a list of lists or a list of objects
    // if it's a list: make sure recipeIngredients contains name, quantity, and unit in the right order 
    for (var i = 0; i < recipeIngredients.length; i++) {
        verifyDeducted(recipeIngredients[i][0], recipeIngredients[i][1], recipeIngredients[i][2]);
    }
    
    inventoryManager.reduceInventory(verifiedIngredients);
    navigation.navigate("Inventory");
}

const verifyIngredientsHelper = (verifiedName, verifiedQuantity, unit) => {

    // case where the user did not use any of the certain ingredient
    if (verifiedQuantity == -1) {
        return true;
    }

    var existsName = inventoryManager.verifyInInventory(verifiedName);

    var correctQuantity = false;
    if (existsName) {
        correctQuantity = inventoryManager.getItemQuantity(verifiedName, unit) < verifiedQuantity;
    }

    var displayError = "";

    if (!existsName) {
        displayError = "No ingredient of this name exists in your inventory";
    } else if (!correctQuantity) {
        var invenQuantity = inventoryManager.getItemQuantity(verifiedName, unit);
        displayError = "You cannot deduct " + verifiedQuantity + " of this ingredient. In your inventory, there exists " + invenQuantity + " " + unit + " of this ingredient";
    }

    if (displayError == "") {
        var verifiedIngredient = {name: verifiedName, quantity: verifiedQuantity, unit: unit};
        verifiedIngredients.push(verifiedIngredient);
        return true;
    } 

    return displayError;
}

const verifyDeducted = ({ name, quantity, unit }) => {

    const [name, onChangeName] = useState(null);
    const [quantity, onChangeQuantity] = useState(null);
    const [unit] = useState(null);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                "Please verify the name and quantity of the ingredients consumed from your recipe.
                If you did not use a certain ingredient in your recipe, mark the quantity as -1."
            </Text>

            <TextInput
                onChangeText={onChangeName}
                value={name}
                placeholder="Name of Ingredient"
                keyboardType="default"
            />

            <TextInput
                onChangeText={onChangeQuantity}
                value={quantity}
                placeholder="Quantity of Ingredient"
                keyboardType="default"
            />

            {/* figure out correct syntax */ }
            <Text>
                "Unit of Ingredient", unit 
            </Text>

            <Button
                title="Done"
                onPress={() => verifyIngredientsHelper(onChangeName, onChangeQuantity)}
            />

        </View>
    );
};

export default verifyDeducted;