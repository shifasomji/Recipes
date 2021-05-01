import Ingredient from './Ingredient';
//This module is a data object containing the information of a user requested recipe

/**
 * The user interactive interface will be using information from this data object to display to the user
 */
class uiRecipe {
  constructor(spoonRecipe) {
    this.spoonjson = spoonRecipe;
    this.title = spoonRecipe.title;
    this.recipeId = spoonRecipe.id;
    this.vegetarian = spoonRecipe.vegetarian;
    this.vegan = spoonRecipe.vegan;
    this.glutenFree = spoonRecipe.glutenFree;
    this.dairyFree = spoonRecipe.dairyFree;
    this.image = spoonRecipe.image;
    this.instruction = spoonRecipe.instructions;
    this.extendedIngredients = spoonRecipe.extendedIngredients;
    this.ingredients = new Array();
    this.populateIngredients();
  }

  populateIngredients() {
    // iterate through the elements in the spoonacular recipe information jsonfile
    // parse and add the relevant information to the data object uiRecipe
    for (var i = 0; i < extendedIngredients.length; i++) {
      this.ingredients.push(new Ingredient(extendedIngredients[i]));
    }
  }
}