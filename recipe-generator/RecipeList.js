/** 
 * This class handles the conversion from Spoonacular jsonfile to a list of recipe objects.
 * 
 * This class will be used in the RecipeGenerator class to store recipes from a Recipe List spoonacular request. It will be the type of the RecipeGenerator's recipes property.
 * 
 */
const RecipeListItem = require('./RecipeListItem.js');

class RecipeList {
  /**
   * Creates an array containing the recipeListItem
   */
  constructor(spoonList) {
    this.listJson = spoonList;
    this.results = this.listJson.results;
    this.recipes = new Array();
    this.populateRecipes();
  }

  /**
   * Adds all the recipeListItems to the recipes array.
   * @params None
   * @returns {null} Nothing is returned.
   */
  populateRecipes() {
    // using the recipeList class
    // iterate through the spoonacular recipe list jsonfile
    //  add the recipe to the recipeList as a recipeListItem (parsing involved)
    // return the recipeList 
    for (var i = 0; i < this.results.length; i++) {
      this.recipes.push(new RecipeListItem(this.results[i]));
    }
  }

  /**
   * returns the recipeList
   * @params None
   * @returns this.recipes {recipeListItem[]}
   */
  getRecipeList() {
    return this.recipes;
  }

  /**
   * returns a recipelistitem from the recipes array
   * @param {number} index 
   */
  getRecipeItem(index) {

  }

  getRecipes() {
    return this.recipes;
  }
}

module.exports = RecipeList;
