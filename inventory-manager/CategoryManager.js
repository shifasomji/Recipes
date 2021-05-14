/**
 * The Category Manager adds mappings from GroceryItem name to category,
 * as well as determines the category a GroceryItem belongs to. 
 */
class CategoryManager {

    /**
     * Array of mappings from GroceryItem name to category. There are seven
     * categories: grains, produce, protein, dairy, beverages, snacks, miscellaneous. 
     * 
     * <GroceryItem.name> : <Category>
     */

    static categoryMappings = {'broccoli': 'produce',
      'bell pepper': 'produce',
      'tomato': 'produce',
      'potato': 'produce',
      'banana': 'produce',
      'onion': 'produce',
      'bread': 'grains'};
    

    /**
     * Determines the category a GroceryItem belongs to by 
     * performing a lookup in the categories array. 
     * 
     * Precondition: Call addCategoryMapping() if the name of
     * the GroceryItem does not exist as a key in the 
     * categoryMappings array. 
     *  
     * @param {StandardGroceryItem} groceryItem - A GroceryItem. 
     * @returns {String} - the GroceryItem's category. 
     */
    lookupCategory(groceryItem) {
        const category = CategoryManager.categoryMappings[groceryItem.name.toLowerCase()];
        return category;
    }

    /**
     * Adds a key-value mapping (GroceryItem name, category) to the
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

// special export for testing
if (typeof(global.it) == 'function') {
   categoryManager._ = {
      categoryMappings: CategoryManager.categoryMappings
   };
}

module.exports = categoryManager;