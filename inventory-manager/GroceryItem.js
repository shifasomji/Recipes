var categoryManager = require('./CategoryManager');

/**
 * Creates a GroceryItem. 
 *  
 * Each GroceryItem contains a name, quantity, unit, foodState, and category. 
 */

class GroceryItem {
    static solidUnits = ['kg', 'g', 'lb', 'oz', ''] // remove empty string?

    static liquidUnits = ['l', 'ml', 'fl oz', 'qt', 'gal']

    constructor(name, quantity, unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.foodState = this.getFoodState(this.unit);
        this.category = categoryManager.lookupCategory(this);
    }

    /**
     * Returns the foodState associated with a particular unit via searches in the
     * solidUnits and liquidUnits arrays. 
     * 
     * @param {String} unit 
     */
    getFoodState(unit) {
        if (GroceryItem.solidUnits.includes(unit)) {
            return "solid";
        } else {
            return "liquid";
        }
    }
}

module.exports = GroceryItem;