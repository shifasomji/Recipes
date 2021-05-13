/**
 * Creates a preference data object that stores all the information needed to call Spoonacular get Recipes Complex API call.
 * Parses the information from the preferences data object 
 * 
 * Note: The possible values for diet and intolerances are determined by what acceptable values Spoonacular accepts for the diet and intolerances parameters.
 * 
 * Diet corresponds to the user's preferred diet.
 * For release 1.0, we will be reducing the diets the user may select. They may select one from the following set: {pescetarian, "vegetarian", "vegan", "paleo"}. These will be the only values the user may select from the user interactive interface. If the user does not have any particular diet, the user interactive interface will provide an empty string as the diet preference. 
 * 
 * Intolerances corresponds to any allergies or food sensitivities the user may have.
 * For release 1.0, the user may select multiple values from the following set:
 * {"dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"}. If the user does not have any intolerances, the user interactive interface will provide an empty string as the diet preference.
 * 
 */

class PreferenceObject {
  // values for intolerances and diets
  // to do: move this to a user interactive interface component. 
  // static possDiets = ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo", "primal", "vegetarian"];
  // static allergies = ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"];

  /**
  * 
  * @param {object} uiPreferences : a  preferences data object from shifa
  */
  constructor(uiPreferences) {
    // store the preferences data object from ui
    this.preferences = uiPreferences;
    // required parameters for the get recipes complex api call (default values)
    this.limitLicense = false;
    this.offset = 0; // how many recipes to exclude
    this.number = 5; // how many recipes to generate
    // optional (data provided from user interactive interface preferences object)
    this.diet; // dietary restrictions (vegan, vegetarian, pescatarian, etc.)
    this.includeIngredients; // preferences data object at index 0
    this.excludeIngredients; // special dietary restrictions (ex: no pork, pork should be listed here)
    this.intolerances; // allergies (shifa needs to add this to the preferences object)
    this.parse();
  }

  /**
    * This method calls all the set parameters methods. 
    * 
    * If any of the set methods throws an error, the errorBool will be set to true and the errorMessage will be set to "Something went wrong, please select your preferences again"
    * 
    * @param None
    * @returns None
    * @returns {Error} if anythin goes wrong with one of the set methods 
    */
  parse() {
    try {
      this.setIncludeIngredients();
      this.setIntolerances();
      this.setDiet();
      this.setExcludeIngredients();
    } catch (err) {
      throw new Error("Bad input");
    }
  }

  /**
   * Sets the value of the preferred ingredients
   * 
   * This method converts the array of ingredients at index 0 of the preferences data object to a stringof ingredients to include separated by a comma and a space.
   *
   *
   * @param None
   * @returns None
   */
  setIncludeIngredients() {
    var ingredArr = this.preferences[0]
    this.includeIngredients = ingredArr.join(', ');
  }

  /**
   * Sets the value of ingredients to exclude.
   *
   * This method converts the array of ingredients at index 1 of the preferences data object to a string of ingredients to exclude separated by a comma and a space.
   * 
   * @param None
   * @returns None
   */
  setExcludeIngredients() {
    var ingredArr = this.preferences[1]
    this.excludeIngredients = ingredArr.join(', ');
  }

  /**
   * Sets the value of the diet parameter.
   * 
   * User may select one diet, the diet parameter will be set to whatever the fourth element is. 
   * The diet value either be a valid diet string or an empty string.
   * 
   * @param None
   * @returns None
   */
  setDiet() {
    this.diet = this.preferences[3][0];
  }

  /**
   * Sets the intolerances parameter
   *
   * This method converts the array of food sensitivities at index 2 of the preferences data object to a string of intolerances.
   * 
   */
  setIntolerances() {
    var intolerantArr = this.preferences[2];
    this.intolerances = intolerantArr.join(', ');
  }
}

module.exports = PreferenceObject;
