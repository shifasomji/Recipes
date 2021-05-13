const PreferenceObject = require('../PreferenceObject');

describe("PreferenceObject Unit Testing:", () => {
  test('Test1: Empty values for intolerances, diet, exclude ingredients, include ingredients', () => {
    const input = uipreferences = [[""], [""], [""], [""]];
    const pref = new PreferenceObject(input);
    expect(pref.limitLicense).toBe(false);
    expect(pref.offset).toEqual(0);
    expect(pref.number).toEqual(5);

    expect(pref.diet).toEqual('');
    expect(pref.excludeIngredients).toEqual('');
    expect(pref.includeIngredients).toEqual('');
    expect(pref.intolerances).toEqual('');
  });
  test("Test2A: single intolerances, single exclude ingredients, single include ingredients", () => {
    const input = [["tomato"], ["pork"], ["shellfish"], ["vegetarian"]];
    const pref = new PreferenceObject(input);
    expect(pref.diet).toEqual('vegetarian');
    expect(pref.excludeIngredients).toEqual('pork');
    expect(pref.includeIngredients).toEqual('tomato');
    expect(pref.intolerances).toEqual('shellfish');
  });
  test("Test2B: multiple intolerances, multiple exclude ingredients, multiple include ingredients", () => {
    const input = [["tomato", "potato"], ["pork", "mango", "coconut"], ["tree nut", "dairy", "shellfish"], ["vegetarian"]];
    const pref = new PreferenceObject(input);
    expect(pref.diet).toEqual('vegetarian');
    expect(pref.excludeIngredients).toEqual('pork, mango, coconut');
    expect(pref.includeIngredients).toEqual('tomato, potato');
    expect(pref.intolerances).toEqual('tree nut, dairy, shellfish');
  });
  test("Test3: Messed up input in wrong format. Should throw an error", () => {
    const input = [[1], [2], [3], [4]];
    const start = () => {
      try {
        var pref = new PreferenceObject(input);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    }
    start();
  });
});