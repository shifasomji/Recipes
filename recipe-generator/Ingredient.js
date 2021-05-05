/**
 * This class will be utilized by the UiRecipe class. It will be the type of the ingredients property of a UiRecipe object. 
 * 
 * It is a data object that stores information of the ingredients needed for a recipe. It stores the name, image, amount, and the units of a ingredient.
 */
export class Ingredient {
  /**
   * spoonIngred is an element from the extendedIngredients array in the spoonacular json file retrieved from a recipe information query.
   * @param {data object from jsonfile} spoonIngred 
   */
  constructor(spoonIngred) {
    this.name = spoonIngred.name;
    this.image = spoonIngred.image; // url of the image
    this.amount = spoonIngred.amount;
    this.unit = spoonIngred.unit;
  }
}
