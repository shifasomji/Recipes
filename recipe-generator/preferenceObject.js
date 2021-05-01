/**
 * Creates a preference data object that stores all the information needed to call Spoonacular get Recipes Complex API call.
 * Parses the information from the preferences data object 
 * 
 * Note: The set of values for diet and intolerances are fixed!
 * 
 */
class PreferenceObject {
  // values for intolerances and diets
  possDiets = ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo", "primal", "vegetarian"];
  allergies = ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"];
  /**
  * 
  * @param {object} preferences : preferences data object from shifa
  */

  constructor(uipreferences) {
    // store the preferences data object from ui
    this.preferences = uipreferences;
    // required parameters for the get recipes complex api call (default values)
    this.limitLicense = false;
    this.offset = 0; // how many recipes to exclude
    this.number = 5; // how many recipes to generate
    // optional (data provided from user interactive interface preferences object)
    this.diet; // dietary restrictions (vegan, vegetarian, pescatarian, etc.)
    this.includeIngredients; // preferences data object at index 0
    this.excludeIngredients; // special dietary restrictions (ex: no pork, pork should be listed here)
    this.intolerances; // allergies (shifa needs to add this to the preferences object)
  }

  /**
    * This method sets all the parameters
    * 
    * throws an error if something wrong happens with parsing
    * 
    */
  parse() {
    try {
      this.setIncludeIngredients();
      this.setIntolerances();
      this.setDiet();
      this.setExcludeIngredients();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * This method converts the array of recipes at index 0 of the preferences data object to a string
   *
   * may be a slow approach but
   * iterate through preferences[0]
   * add element to array
   * join array into a ingredient string
   * set includeIngredients to ingredient string
   *
   * set that includeIngredients to the ingredient string
   *
   *
   * @param None
   * @returns None
   */
  setIncludeIngredients() {
    ingredientStr = "";
    var len = preferences[0].length;
    var ingredients_arr = preferences[0];
    for (var i = 0; i < len; i++) {
      ingredientStr += ingredients_arr[i];
      if (i != len - 1) {
        ingredientStr += ", ";
      }
    }
    this.includeIngredients = ingredientStr;
  }

  /**
   * iterate through preferences[1]
   * If element not in possDiets or allergies is in preferences[1]
   * add the element to an array
   *
   * convert array to a string
   * set intolerances to that string
   *
   * @param None
   * @returns None
   */
  setExcludeIngredients() {
    avoidStr = "";
    var len = preferences[1].length;
    var ingredients_arr = this.preferences[1];
    for (var i = 0; i < len; i++) {
      avoidStr += ingredients_arr[i];
      if (i != len - 1) {
        avoidStr += ", ";
      }
    }
    this.excludeIngredients = avoidStr;
  }

  /**
   * iterate through preferences[1]
   * if dietary restriction is a possible diet
   * add that to an array
   * join the array as a diet string
   *
   * set diet to the diet string
   * @param None
   * @returns None
   */
  setDiet() {
    this.diet = preferences[3];
  }

  /**
   * iterate through preferences[1]
   * if dietary restriction is an allergy
   * add to an array
   * join the array as intolerances string
   *
   * set intolerances to the intolerances string
   */
  setIntolerances() {
    this.intolerances = preferences[2];
  }
}