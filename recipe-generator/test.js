import { RecipeGenerator } from './RecipeGenerator.js';
import { PreferenceObject } from './PreferenceObject.js';

// var uipreferences = [["tomato", "potato"], ["pork"], ["tree nut"], ["vegetarian"]];
var uipreferences = [[""], [""], [""], [""]];

var preferences = new PreferenceObject(uipreferences);
console.log(preferences);
var uipreferences2 = [["tomato", "potato"], ["pork"], ["tree nut"], ["vegetarian"]];
var preferences2 = new PreferenceObject(uipreferences2);
console.log(preferences2);
// if (preferences.errorBool) {
//   // To Do: remove
//   // throw new UserException('Preferences Selection Error');
//   return preferences.errorMessage;
// }

// fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?ranking=2&number=5&offset=0&excludeIngredients=${preferences.excludeIngredients}&diet=${preferences.diet}&intolerances=${preferences.intolerances}&includeIngredients=${preferences.includeIngredients}`, {
//   "method": "GET",
//   "headers": {
//     "x-rapidapi-key": "621409563cmshab64d51a4e7a120p11b940jsn5305e86310da",
//     "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
//   }
// })
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data);
//     console.log(data.results);
//     this.listJson = data;
//     this.recipes = new RecipeList(this.listJson);
//   })
//   .catch(err => {
//     console.error(err);
//   });
// var query = new RecipeGenerator(preferences);
// query.generateRecipes();
// console.log(query.listJson.results);

