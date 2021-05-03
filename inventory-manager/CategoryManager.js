/**
 * The Category Manager determines the category a StandardGroceryItem belongs to. 
 */
class CategoryManager {

    /**
     * Array of mappings from StandardGroceryItem name to category. The possible 
     * categories are: grains, produce, protein, dairy, beverages, snacks, miscellaneous. 
     * <StandardGroceryItem-name> : <Category>
     */

    static categoryMappings = {};
    

    /**
     * Determines the category a StandardGroceryItem belongss to by 
     * performing a lookup in the categories array. 
     *  
     * @param {StandardGroceryItem} standardGroceryItem - A StandardGroceryItem. 
     * @returns {String} - the StandardGroceryItem's category. 
     */
    lookupCategory(standardGroceryItem) {
        const category = CategoryManager.categoryMappings[standardGroceryItem.name.toLowerCase()];
        return category;
    }

    /**
     * Adds a key-value mapping (grocery item name, category) to the
     * categoryMappings array.
     * 
     * @param {String} - Name of GroceryItem. 
     * @param {String} - Category of GroceryItem. 
     */
     addCategoryMapping(groceryItemName, category){
        CategoryManager.categoryMappings[groceryItemName.toLowerCase()] = category;
     }
}


const categoryManager = new CategoryManager();
if (typeof(global.it) == 'function') {
   categoryManager._ = {
      categoryMappings: CategoryManager.categoryMappings
   };
}

module.exports = categoryManager;