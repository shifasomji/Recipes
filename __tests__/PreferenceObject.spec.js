const {
  PreferenceObject,
} = require(`../recipe-generator/PreferenceObject`);

test('parse test: empty values for intolerances, diet, exclude ingredients, include ingredients', () => {
  const input = uipreferences = [[""], [""], [""], [""]];
  const pref = new PreferenceObject(input);
  expect(pref.limitLicense).toEqual(false);
  expect(pref.offset).toEqual(0);
  expect(pref.number).toEqual(5);
  expect(errorBool).toEqual(false);

  expect(pref.diet).toEqual('');
  expect(pref.excludeIngredients).toEqual('');
  expect(pref.includeIngredients).toEqual('');
  expect(pref.intolerances).toEqual('');
  expect(pref.preferences).toEqual(input);
});