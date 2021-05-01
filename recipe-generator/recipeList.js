// This module handles the conversion from Spoonacular jsonfile to a list of recipe objects.
import { RecipeListItem } from RecipeListItem;

class RecipeList {
  recipes;
  listjson;
  /**
   * Creates an array containing the recipeListItem
   */
  constructor(spoonList) {
    this.listjson = spoonList;
    this.results = spoonList.results;
    this.recipes = new Array();
  }

  /**
   * Adds all the recipeListItems to the recipes array.
   * @params {jsonfile} spoonList  The spoonacular API jsonfile containing a list of recipes.
   * @returns {null} Nothing is returned.
   */
  populateRecipes() {
    // using the recipeList class
    // iterate through the spoonacular recipe list jsonfile
    //  add the recipe to the recipeList as a recipeListItem (parsing involved)
    // return the recipeList 
    for (var i = 0; i < this.results.length; i++) {
      this.recipes.push(new recipeListItem(results[i]));
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
}