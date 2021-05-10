const RecipeGenerator = require('../RecipeGenerator');
const PreferenceObject = require('../PreferenceObject');
const RecipeListItem = require('../RecipeListItem');

describe("RecipeGenerator.js Unit Testing: ", () => {
  const input = [["tomato", "egg", "chives"], ["pork"], ["shellfish"], ["vegetarian"]];

  // PASSED

  test("Test1: Confirm preferences received from the user interactive interface are parsed correctly. Correct type and correct value.", () => {
    const query = new RecipeGenerator(input);
    // check that preferences is indeed a preference object
    expect(query.preferences instanceof PreferenceObject).toBe(true);

    // check that that the values and types are correct
    expect(query.diet).toEqual("vegetarian");
    expect(typeof query.diet).toEqual("string");
    expect(query.intolerances).toEqual("shellfish");
    expect(typeof query.intolerances).toEqual("string");
    expect(query.excludeIngredients).toEqual("pork");
    expect(typeof query.excludeIngredients).toEqual("string");
    expect(query.includeIngredients).toEqual("tomato, egg, chives");
    expect(typeof query.includeIngredients).toEqual("string");
  })

  // PASSED

  test("Test2A: Search Recipes Complex API call", () => {

    var listJson;
    var recipes;
    var start = async function () {
      const query = new RecipeGenerator(input);
      await query.initialize();

      listJson = query.getRecipesList();
      recipes = populateRecipes();
      expect(listJson instanceof Object).toEqual(true);
      expect(listJson.hasOwnProperty('results')).toEqual(true); // checks that the requested file is in fact from Search Recipes Complex call

      expect(recipes instanceof Array).toEqual(true);

      const recipe = recipes[0];
      expect(recipe instanceof RecipeListItem);
      expect(typeof recipe.id).toEqual("number");
      expect(typeof recipe.title).toEqual("string");
      expect(typeof recipe.missedCount).toEqual("number");
      expect(typeof recipe.usedCount).toEqual("number");
      expect(typeof recipe.image).toEqual("string");
      expect(typeof recipe.imageType).toEqual("string");
    }

    start();
  });


  // PASSED

  test("Test2B: generating recipes throws an error", () => {
    const badInput = [["unicorn"], [""], [""], [""]];
    const start = async function () {
      try {
        const query = new RecipeGenerator(badInput);
        await query.initialize();

        console.log(query.getResults());
        console.log(query.getRecipesList());
        console.log(query.populateRecipes());
      } catch (err) {
        console.log("Could not populate recipes because there are no recipes to populate with.");
        expect(err).toBeInstanceOf(Error);
        expect(err).toHaveProperty("No results generated please search for something else");
      }
    }

    start();
  })

  // PASSED

  test("Test 3A: Get Recipe Information: ", () => {
    var recipeJson;
    var uiRecipe;
    const start = async function () {
      const query = new RecipeGenerator(input);
      query.setRecipeId(530216); // testing a recipeId value
      console.log(query.recipeID);

      // tests that the recipe Id has changed
      expect(query.recipeID).toEqual(530216);
      await query.initialize2();

      recipeJson = query.getRecipeContent();
      uiRecipe = query.getUiRecipe();
      expect(recipeJson.hasOwnProperty('extendedIngredients')).toEqual(true); // checks that the requested file is in fact from Get Recipe Information API call

      expect(uiRecipe instanceof RecipeListItem);
      expect(typeof uiRecipe.title).toEqual("string");
      expect(typeof uiRecipe.recippeId).toEqual("number");
      expect(typeof uiRecipe.vegetarian).toEqual("boolean");
      expect(typeof uiRecipe.vegan).toEqual("boolean");
      expect(typeof uiRecipe.glutenFree).toEqual("boolean");
      expect(typeof uiRecipe.dairyFree).toEqual("boolean");
      expect(typeof uiRecipe.image).toEqual("string");
      expect(typeof uiRecipe.instruction).toEqual("string");
      expect(typeof uiRecipe.instruction).toEqual("string");
      expect(uiRecipe.ingrediets instanceof Array).toEqual(true);
    }

    start();
  })
});