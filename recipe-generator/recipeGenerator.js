/**
 * This module is the main class of the recipe-generator component. It requests information from the Spoonacular API
 * 
 * PreferenceObject is a class used to parse and store information from the user interactive interfaces preferences array. The preferences array is passed to the RecipeGenerator as a parameter in the constructor.
 * 
 * RecipeList is an array of RecipeListItem. It stores information from a recipe list query.
 * 
 * UiRecipe is a data object storing information about a requested recipe. It stores an array of ingredients, and their corresponding image, amounts, and units.
 * 
 */
import { PreferenceObject } from './PreferenceObject.js';
import { RecipeList } from './RecipeList.js';

/**
 * This is the main class that will generate results for the application and interact between the user interactive interface and the spoonacular api.
 * It will use the parser and the query class to request information from the spoonacular api.
 * 
 */
export class RecipeGenerator {
  /**
   * Create a new recipeGenerator
   * @param {object} userPreferences: A javascript object storing the data of the user preferences.
   * @param {*} requestType: The type of request the user is making. 1 is search for recipes request (list). 2 is get recipe data request (information).
   */
  constructor(userPreferences) {
    this.usrprefs = userPreferences;
    this.recipeID;
    this.listJson;
    this.recipeJson;
    this.recipes; // a list of recipe list items
    this.recipeInfo; // a data object storing the recipe information
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
    var preferences = new PreferenceObject(this.uipreferences);
    if (preferences.errorBool) {
      // To Do: remove
      // throw new UserException('Preferences Selection Error');
      return preferences.errorMessage;
    }

    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?ranking=2&number=5&offset=0&excludeIngredients=${preferences.excludeIngredients}&diet=${preferences.diet}&intolerances=${preferences.intolerances}&includeIngredients=${preferences.includeIngredients}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "621409563cmshab64d51a4e7a120p11b940jsn5305e86310da",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.results);
        this.listJson = data;
        this.recipes = new RecipeList(this.listJson);
      })
      .catch(err => {
        console.error(err);
      });

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

    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.recipeID}/information`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "621409563cmshab64d51a4e7a120p11b940jsn5305e86310da",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        this.recipeJson = data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * 
   * @param {number} recipeId the recipe id to change the number to.
   * @return None
   * @throws error recipeid is not a number
   */
  setRecipeId(recipeId) {
    if (isNaN(recipeId)) {
      throw TypeException('Recipe ID given is not a number');
    }
    this.recipeID = recipeId;
  }
  /**
   * This method will parse the spoonacular api data into a data object that can be interpreted by the user interactive interface.
   * @returns {object} uiRecipe
   * 
   */
  parseRecipe() {
    var uiRecipe = new UiRecipe(this.recipeJson);

    return uiRecipe;
  }

}