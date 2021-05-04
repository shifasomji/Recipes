/* 
This module's responsbility is to create the preferences data object
It will ask the user for their dietary restrictions and ingredient preferences
This module will use the dietary restrictions, preferences, and current ingredients to create a data object to be passed to the spoonacular api
*/

class preferences {
    constructor() {
        this.dietary = 0;
        this.diet = [];
        this.includeIngredients = new Array();
        this.excludeIngredients = new Array();
        this.intolerances = new Array();
    }

    // removed userPreferences function because it is accounted for in recipe.js

    userDietary(chooseDietary = true) {
        /*
            ask the user for their dietary restrictions 
            only asked once during set up of account (sets this.dietary == 1)
            user will enter in strings representing their restrictions
            store dietary restrictions in a list 
            list will be compiled with other inputs in createPreferencesObject()
            
            when this function is called:
            - check this.dietary 
            - if this.dietary == 0: increment, ask user for dietary restrictions
            - if this.dietary > 0: dietary restrictions have already been set
            @param chooseDietary: bool variable indicating whether user has clicked "set dietary restrictions" button
            @output dietary: list of user's dietary restrictions
        */

        if (this.dietary == 0) {
            this.dietary++;
        } else {
            return this.diet;
        }
    }
    
    createPreferencesObject() {
        /*
            create the preferences data object
            - this object will be of the following format: 
            [["ingredients to include"], ["ingredients to exclude"], ["intolerances"], ["diets"]]
            create a query call to spoonacular api 
            input to query call will be the preferences object
            @param preferences: user's preferences as a list (this is now a class variable)
            @param dietary: user's dietary restrictions as a list (this is now a class variable)
            @output preferences: create a query call to spoonacular and pass the preferences object
        */

        var preferencesObject = [this.includeIngredients, this.excludeIngredients, this.intolerances, this.diet];
        // call preferenceObject.js in lucky's component
    }
}