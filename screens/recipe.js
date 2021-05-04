import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

import {
  APPINPUTVIEW,
  APPTEXTBLACK
} from "../style/constants";

export default function App() {

  const [ include, setInclude ] = useState("");
  const [ diet, setDiet ] = useState("");
  const [ allergy, setAllergy ] = useState("");
  const [ exclude, setExclude ] = useState("");

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
              "Please select a ingredients to include"
          }
      </Text>
      <RNPickerSelect
          onValueChange={(include) => setInclude(include)}
          items={[

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
          onValueChange={(exclude) => setExclude(exclude)}
          items={[
            { label: 'Chicken', value: 'C' },
            { label: 'Pork', value: 'P' },
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

      <Button
        title="Find Recipe"
        onPress={() => Alert.alert('Recipes will be displayed')}
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
