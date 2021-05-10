const UiRecipe = require('../UiRecipe');
const Ingredient = require('../Ingredient');

describe("UiRecipe Unit Testing", () => {
  test("Test1: Ensure that constructor parses the recipe jsonfile correctly", () => {
    const data = require('../Mocks/test2.json');
    const recipe = new UiRecipe(data);

    const spoonJson = recipe.spoonJson;
    expect(spoonJson instanceof Object).toEqual(true);

    const extendedIngredients = recipe.extendedIngredients;
    expect(extendedIngredients instanceof Array).toEqual(true); // an array

    const title = recipe.title;
    expect(typeof title).toEqual("string");

    const recipeId = recipe.recipeId;
    expect(typeof recipeId).toEqual("number");

    const vegetarian = recipe.vegetarian;
    expect(typeof vegetarian).toEqual("boolean");

    const vegan = recipe.vegan;
    expect(typeof vegan).toEqual("boolean");

    const glutenFree = recipe.glutenFree;
    expect(typeof glutenFree).toEqual("boolean");

    const dairyFree = recipe.dairyFree;
    expect(typeof dairyFree).toEqual("boolean");

    const image = recipe.image;
    expect(typeof image).toEqual("string");

    const instruction = recipe.instruction;
    expect(typeof instruction).toEqual("string");

    const ingredients = recipe.ingredients;
    expect(ingredients instanceof Array).toEqual(true); //array
    expect(ingredients[0] instanceof Ingredient).toEqual(true);

    const ingredientslen = extendedIngredients.length;
    expect(ingredientslen == ingredients.length).toEqual(true);

  })
})