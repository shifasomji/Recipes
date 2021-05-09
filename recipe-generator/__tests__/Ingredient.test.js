const Ingredient = require('../Ingredient');

describe("Ingredient.js Unit Testing: ", () => {
  test("Test1: Ensuring that the constructor parses an ingredient element from the Spoonacular extendedIngredients array correctly. Correctness is correct type and value.", () => {
    const data = require('../Mocks/test2.json');
    const ingreds = data.extendedIngredients;
    const ingredInfo = ingreds[0];
    const ingred = new Ingredient(ingredInfo);

    const name = ingred.name;
    expect(name).toEqual("chives");
    expect(typeof name).toEqual("string");

    const image = ingred.image;
    expect(image).toEqual("fresh-chives.jpg");
    expect(typeof image).toEqual("string");

    const amount = ingred.amount;
    expect(amount).toEqual(1);
    expect(typeof amount).toEqual("number");

    const unit = ingred.unit;
    expect(unit).toEqual("tablespoon");
    expect(typeof unit).toEqual("string");
  })
});


/**
 * extendedIngredients[0] from test2.json
 */
// {
//   "id": 11156,
//   "aisle": "Produce",
//   "image": "fresh-chives.jpg",
//   "consistency": "solid",
//   "name": "chives",
//   "nameClean": "chives",
//   "original": "1 tablespoon chives, minced",
//   "originalString": "1 tablespoon chives, minced",
//   "originalName": "chives, minced",
//   "amount": 1,
//   "unit": "tablespoon",
//   "meta": [
//       "minced"
//   ],
//   "metaInformation": [
//       "minced"
//   ],
//   "measures": {
//       "us": {
//           "amount": 1,
//           "unitShort": "Tbsp",
//           "unitLong": "Tbsp"
//       },
//       "metric": {
//           "amount": 1,
//           "unitShort": "Tbsp",
//           "unitLong": "Tbsp"
//       }
//   }
// },