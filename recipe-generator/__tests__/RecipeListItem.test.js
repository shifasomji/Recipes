const RecipeListItem = require('../RecipeListItem.js');

describe("RecipeListItem Unit Testing: Constructor testing", () => {
  test("Test1: Ensuring that the constructor parses a recipe item correctly and each property has the correct type.", () => {
    const data = require('../Mocks/test1.json');
    const result = data.results[1];
    const recipeItem = new RecipeListItem(result);

    const id = recipeItem.id;
    expect(id).toEqual(1087955);
    expect(typeof id).toEqual("number");

    const used = recipeItem.usedCount;
    expect(used).toEqual(2);
    expect(typeof used).toEqual("number");

    const missed = recipeItem.missedCount;
    expect(missed).toEqual(2);
    expect(typeof missed).toEqual("number");

    const title = recipeItem.title;
    expect(title).toEqual('Toadstool" Halloween Eggs');
    expect(typeof title).toEqual("string");

    const image = recipeItem.image;
    expect(image).toEqual('https://spoonacular.com/recipeImages/1087955-312x231.jpg');
    expect(typeof image).toEqual("string");

    const type = recipeItem.imageType;
    expect(type).toEqual('jpg');
    expect(typeof type).toEqual("string");
  })
});