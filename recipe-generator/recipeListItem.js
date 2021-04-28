// This module represents a single element (recipe) in a recipeList. The recipeList class extends from this. This module can also just be replaced with an array with each index mapping to data about a recipe.

/**
 * An object representing an individual piece of recipe information in a list of other recipe items. This object will contain the data that will be displayed to the user and if the user is interested in gettinng more information about the recipe, they will click on it and the recipe generator will make a second request to the api for more information about the recipe. Once that is called, the clicked {boolean} will be set to true so that there will not be multiple calls to the api for the same recipeListItem if the user goes back and forth between recipes.
 * 
 * The clicked implementation may be resolved in the user interactve interface component instead.
 * 
 * Instances of the recipeListItem will be created in the * 
 * recipeList class.
 * 
 */
class recipeListItem {
  constructor(spoonListRecipe) {
    this.id = spoonListRecipe.id;
    this.usedCount = spoonListRecipe.usedIngredientCount;
    this.missedCount = spoonListRecipe.missedIngredientCount;
    this.title = spoonListRecipe.title;
    this.image = spoonListRecipe.image;
    this.imageType = spoonListRecipe.imageType;
    this.calories = spoonListRecipe.calories;
    this.protein = spoonListRecipe.protein;
    this.fat = spoonListRecipe.fat;
    this.carbs = spoonListRecipe.carbs;
    this.clicked = false;
  }

  /**
   * The user has clicked the recipe
   */
  click() {
    this.clicked = true;
  }
}