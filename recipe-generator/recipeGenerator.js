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
// import { PreferenceObject } from './PreferenceObject.js';
// import { RecipeList } from './RecipeList.js';
// import { RecipeListItem } from './RecipeListItem.js';
// import { UiRecipe } from './UiRecipe.js';
// import { Ingredient } from './Ingredient.js';
"use strict";
const axios = require("axios");
const PreferenceObject = require('./PreferenceObject.js');
// const RecipeList = require('./RecipeList.js');
const RecipeListItem = require('./RecipeListItem.js');
const UiRecipe = require('./UiRecipe.js');
// const Ingredient = require('./Ingredient.js');

/**
 * This is the main class that will generate results for the application and interact between the user interactive interface and the spoonacular api.
 * It will use the parser and the query class to request information from the spoonacular api.
 * 
 */
class RecipeGenerator {
  /**
   * Create a new recipeGenerator
   * @param {object} userPreferences: A javascript object storing the data of the user preferences.
   * @param {*} requestType: The type of request the user is making. 1 is search for recipes request (list). 2 is get recipe data request (information).
   */
  constructor(userPreferences) {
    this.usrprefs = userPreferences;
    this.preferences = new PreferenceObject(userPreferences);
    this.diet = this.preferences.diet;
    this.intolerances = this.preferences.intolerances;
    this.excludeIngredients = this.preferences.excludeIngredients;
    this.includeIngredients = this.preferences.includeIngredients;
    this.recipeID;
  }

  /**
   * Starts the call to the API. (Search Recipes Complex) 
   */
  async initialize() {
    let options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex',
      params: {
        limitLicense: this.preferences.limitLicense,
        offset: this.preferences.offset,
        number: this.preferences.number,
        intolerances: this.intolerances,
        ranking: '0',
        excludeIngredients: this.excludeIngredients,
        includeIngredients: this.includeIngredients,
        diet: this.diet,
      },
      headers: {
        'x-rapidapi-key': '621409563cmshab64d51a4e7a120p11b940jsn5305e86310da',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    this.responseList = await axios.request(options);
  }

  /**
   * Completes the promise from the initialize method and returns the jsonfile object literal
   * 
   * @returns spoonacular API recipes list
   */
  getRecipesList() {
    this.listJson = this.responseList.data;

    return this.responseList.data;
  }

  /**
   * Completes the promise from the initialize method and returns the jsonfile object literal
   * 
   * @returns results array from spoonaccular API recipes list
   */
  getResults() {
    this.results = this.responseList.data.results;

    return this.responseList.data.results;
  }

  /**
   * Adds all the recipeListItems to the recipes array.
   * @params None
   * @returns {the array of recipes} The array of recipes.
   * @returns {error} empty results 
   */
  populateRecipes() {
    let results = this.getResults();
    if (results.length == 0) {
      throw new Error("No results generated please search for something else");
    }
    let res = [];
    for (let i = 0; i < results.length; i++) {
      res.push(new RecipeListItem(results[i]));
    }

    this.recipes = res;
    return res;
  }

  /**
   * The user interactive interactive calls this method with the parameter of the requested recipe id. This method updates the recipeID property. 
   * 
   * @param {number} recipeId | The identification number of the recipe the user wants to request. 
   */
  setRecipeId(recipeId) {
    this.recipeID = recipeId;
  }

  /**
   * Starts the call to the second API call (Get Recipe Information)
   */
  async initialize2() {
    let options = {
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.recipeID}/information`,
      headers: {
        'x-rapidapi-key': '621409563cmshab64d51a4e7a120p11b940jsn5305e86310da',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    this.responseRecipe = await axios.request(options);
  }

  /**
   * This method gets the jsonfile of the Get Recipe Information API call by completing the promise.
   * 
   * @returns Jsonfile containing the information of the user requested recipe (Get Recipe Information)
   */
  getRecipeContent() {
    this.recipeInfo = this.responseRecipe.data;

    return this.responseRecipe.data;
  }

  /**
   * This method parses the jsonfile from Get Recipe Information and returns a UiRecipe information object containing the relevant data from the jsonfile
   * 
   * @returns {UiRecipe} A data bject containing the relevant data from the jsonfile.
   */
  getUiRecipe() {
    let recipeInfo = this.getRecipeContent();
    var uiRecipe = new UiRecipe(recipeInfo);

    return uiRecipe;
  }

}

module.exports = RecipeGenerator;