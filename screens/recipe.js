import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

import {
  APPINPUTVIEW,
} from "../style/constants";

export default function Recipe() {

  const [ diet, setDiet ] = useState("");
  const [ include, setInclude ] = useState("");
  const [ exclude, setExclude ] = useState("");
  const [ allergy, setAllergy ] = useState("");

  return (
    <View style={styles.container}>

      {/* select diet */ }
      <Text>
          {diet ?
            `Select your diet` :
              "Please select a diet"
          }
      </Text>
      <RNPickerSelect
          onValueChange={(diet) => setDiet(diet)}
          items={[
            { label: 'Pescetarian', value: 'PES' },
            { label: 'Vegan', value: 'VEGA' },	
            { label: 'Paleo', value: 'PAL' },
            { label: 'Vegetarian', value: 'VEGE' },
          ]}
      />

      {/* select ingredients to include */ }
      <Text>
          {include ?
            `Select ingredients to include` :
              "Please select ingredients to include"
          }
      </Text>
      <RNPickerSelect
          onValueChange={(include) => setInclude(include)}
          items={[
            /* show all items from inventory */
          ]}
      />

      {/* select ingredients to exclude */ }
      <Text>
          {exclude ?
            `Select ingredients to exclude` :
              "Please select ingredients to exclude"
          }
      </Text>
      <RNPickerSelect
          style={{width: 200, height: 14}}
          onValueChange={(exclude) => setExclude(exclude)}
          items={[
            { label: 'Chicken', value: 'C' },
            { label: 'Pork', value: 'P' },
            /* show all items from inventory */
          ]}
      />

      {/* select allergy causing ingredients */ }
      <Text>
          {allergy ?
            `Select ingredients that cause allergies` :
              "Please select allergy causing ingredients"
          }
      </Text>
      <RNPickerSelect
          onValueChange={(allergy) => setAllergy(allergy)}
          items={[
            { label: 'Dairy', value: 'D' },
            { label: 'Egg', value: 'E' },	
            { label: 'Gluten', value: 'G' },
            { label: 'Peanut', value: 'P' },
            { label: 'Sesame', value: 'SS' },
            { label: 'Seafood', value: 'SEA' },
            { label: 'Shellfish', value: 'SH' },
            { label: 'Soy', value: 'SO' },
            { label: 'Sulfite', value: 'SU' },
            { label: 'Tree Nut', value: 'T' },
            { label: 'Wheat', value: 'W' },
          ]}
      />

      <Text testID="diet">Diet: {diet} </Text>
      <Text testID="include"> Include: {include} </Text>
      <Text testID="exclude"> Exclude: {exclude} </Text>
      <Text testID="allergy"> Allergy: {allergy} </Text>

      <Button
        title="Get Recipe Suggestions!"
        testID="recipe suggestions"
        onPress={() => Alert.alert('Recipes will be displayed')} /* call lucky's component */
        color={APPINPUTVIEW}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
