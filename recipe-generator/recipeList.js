/** 
 * This class handles the conversion from Spoonacular jsonfile to a list of recipe objects.
 * 
 * This class will be used in the RecipeGenerator class to store recipes from a Recipe List spoonacular request. It will be the type of the RecipeGenerator's recipes property.
 * 
 */
import { RecipeListItem } from RecipeListItem;

class RecipeList {
  /**
   * Creates an array containing the recipeListItem
   */
  constructor(spoonList) {
    this.listjson = spoonList;
    this.results = spoonList.results;
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
      this.recipes.push(new RecipeListItem(results[i]));
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

export default RecipeList;