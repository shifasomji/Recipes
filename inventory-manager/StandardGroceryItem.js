/**
 * Creates a StandardGroceryItem.
 * 
 * A StandardGroceryItem differs from a GroceryItem in that it
 * contains standard units (g for solids, L for liquids). The unit 
 * is implied by the foodState, so a StandardGroceryItem
 * does not have an attribute for unit. 
 * 
 * Each StandardGroceryItem contains name, quantity, and category.  
 */
 class StandardGroceryItem {
    constructor(name, quantity, category) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
    }
}

module.exports = StandardGroceryItem;