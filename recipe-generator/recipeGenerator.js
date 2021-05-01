// This module is the main class of the component. It requests information from the Spoonacular API
import { preferenceObject } from preferenceObject;
import { recipeList } from recipeList;
import { recipeListItem } from recipeListItem;
/**
 * This is the main class that will generate results for the application and interact between the user interactive interface and the spoonacular api.
 * It will use the parser and the query class to request information from the spoonacular api.
 * 
 */
class RecipeGenerator {
  usrprefs;
  recipeId;
  recipes; // a list of recipeListItem objects
  recipeInfo; // a data object storing the recipe information.
  query;
  /**
   * variables storing the json files
   */
  listjson;
  recipejson;

  /**
   * Create a new recipeGenerator
   * @param {object} userPreferences: A javascript object storing the data of the user preferences.
   * @param {number} recipeID: The spoonacular ID for a recipe's information.
   * Depending on the request, one out of the two parameters above will have a null value;
   * @param {*} requestType: The type of request the user is making. 1 is search for recipes request (list). 2 is get recipe data request (information).
   */
  constructor(userPreferences, recipeID) {
    this.usrprefs = userPreferences;
    this.recipeID = recipeID;
    this.recipes = new recipeList();
  }

  /**
   * This function will request recipes
   * 
   * request -> parsing -> response
   * 
   * @param None
   * @return {object} recipe Information
   * @throws {error} if the spoonList is empty 
   * @throws {error} if spoonacular throws an error
   * @throws {error} if an error occured during parsing of user preferences
   */

  generateRecipes() {
    // the request type is a recipe list request
    // create a preference object class and parse user preferences
    // call requestRecipes and store the jsonfile as a variable
    // parse the recipesList into an User interactive interface facing object 
    // return the parsed object.
    preferences = new preferenceObject(uipreferences);
    try {
      preferences.parse();
    }
    catch (err) {
      console.log(err);
    }

    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?ranking=2&number=5&offset=0&excludeIngredients=${preferences.excludeIngredients}&diet=${preferences.diet}&intolerances=${preferences.intolerances}&includeIngredients=${preferences.includeIngredients}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "API-KEY",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then((data) => {
        // console.log(data);
        this.listjson = data;
      })
      .catch(err => {
        console.error(err);
      });

    this.recipes.populateRecipes(listjson);

    return this.recipes;
  }

  /**
   * This function will request a recipes information
   * 
   * request -> parsing -> response
   * 
   * @param None
   * @return {object} recipe Information 
   * @throws {error} if spoonacular throws an error
   * @throws {error} if recipeId does not exist (may end up being handled by the same error case above)
   */
  generateRecipeInfo() {
    // The request type is a recipe information request
    // call requestRecipeInnfo and store the jsonfile as variable
    //  parse the spoonacular recipe information jsonfile into an user interactive interface facing object.
    // return the parsed object

    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.recipeId}/information`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "API-KEY",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        this.recipejson = data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * This method will parse the spoonacular api data into a data object that can be interpreted by the user interactive interface.
   * @parameters {jsonfile} spoonRecipe
   * @returns {object} uiRecipe
   * 
   */
  parseRecipe() {
    // create a data object uiRecipe
    // iterate through the elements in the spoonacular recipe information jsonfile
    // parse and add the relevant information to the data object uiRecipe
    // return uiRecipe
    uiRecipe = new uiRecipe(recipejson);

    return uiRecipe;
  }

}