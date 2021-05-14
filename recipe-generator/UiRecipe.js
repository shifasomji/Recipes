const Ingredient = require('./Ingredient.js');
//This module is a data object containing the information of a user requested recipe

/**
 * The user interactive interface will be using information from this data object to display to the user
 */
class UiRecipe {
  /**
   * 
   * @param {jsonfile} spoonRecipe A jsonfile from spoonacular that stores information about the recipe requested by the user.
   */
  constructor(spoonRecipe) {
    // the information that ui recipe will display
    this.spoonJson = spoonRecipe;
    this.extendedIngredients = spoonRecipe.extendedIngredients;
    this.title = spoonRecipe.title;
    this.recipeId = spoonRecipe.id;
    this.vegetarian = spoonRecipe.vegetarian;
    this.vegan = spoonRecipe.vegan;
    this.glutenFree = spoonRecipe.glutenFree;
    this.dairyFree = spoonRecipe.dairyFree;
    this.image = spoonRecipe.image;
    this.instruction = spoonRecipe.instructions;
    this.ingredients = new Array();
    this.populateIngredients();
  }

  /**
   * iterate through the elements in the spoonacular get recipe information jsonfile
   * Create an Ingredient data object by giving it an extendedIngredients element
   * push that ingredient data object into the ingredients array.
   * 
   * @param {None}
   * @returns {None}
   */
  populateIngredients() {
    // iterate through the elements in the spoonacular recipe information jsonfile
    // parse and add the relevant information to the data object uiRecipe
    for (var i = 0; i < this.extendedIngredients.length; i++) {
      this.ingredients.push(new Ingredient(this.extendedIngredients[i]));
    }
  }
}

module.exports = UiRecipe;
