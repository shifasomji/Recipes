var StandardGroceryItem = require("./StandardGroceryItem");

/**
 * The Unit Converter assists the Inventory Manager by converting GroceryItems to
 * StandardGroceryItems. 
 */
class UnitConverter { 
 
    /**
     * Solid conversions to the standard solid unit (kg).
     * <from-unit> : <multiplyByFactor>
     */
    static solidConversions = 
        {lb : 0.454,
         oz : 0.0283,
         g : 0.001
        };  
    

    /**
     * Liquid conversions to the standard liquid unit (L).
     * <from-unit> : <multiplyByFactor>
     */
    static liquidConversions = 
        {qt : 0.946,
         ml : 0.001,
         'fl oz': 0.0296,
         gal : 3.785}; 
    

    /**
     * Converts GroceryItems to std units (kg for solids, L for liquids). Calls convertSolidUnit
     * for each solid grocery and convertLiquidUnit for each liquid grocery.
     * 
     * @param {GroceryItem[]} groceryItems - A GroceryItem array. 
     * @returns {StandardGroceryItem[]} - A StandardGroceryItem array. 
     */
    standardizeUnits(groceryItems){
        var stdGroceryItems = [];

        for (var groceryItem of groceryItems) {
            if (groceryItem.foodState == 'solid' && groceryItem.unit != 'kg'){
                this.convertSolidUnit(groceryItem);
            } else if (groceryItem.foodState == 'liquid' && groceryItem.unit != 'L'){
                this.convertLiquidUnit(groceryItem);
            } 

            var stdGroceryItem = new StandardGroceryItem(groceryItem.name, groceryItem.quantity, groceryItem.category);
            stdGroceryItems.push(stdGroceryItem);
        }
        return stdGroceryItems;
    }

    /**
     * Converts a solid grocery to std unit (kg) via a multiplication factor
     * lookup in the solidConversions array. 
     * 
     * @param {GroceryItem} groceryItem - a solid GroceryItem. 
     */
    convertSolidUnit(groceryItem){
        var multFactor = UnitConverter.solidConversions[groceryItem.unit.toLowerCase()];
        var newQty = groceryItem.quantity * multFactor;
        groceryItem.quantity = newQty;
    }

    /**
     * Converts a liquid grocery to std unit (L) via a multiplication factor
     * lookup in the liquidConversions array. 
     * 
     * @param {GroceryItem} groceryItem - a liquid GroceryItem.
     */
    convertLiquidUnit(groceryItem){
        var multFactor = UnitConverter.liquidConversions[groceryItem.unit.toLowerCase()];
        var newQty = groceryItem.quantity * multFactor;
        groceryItem.quantity = newQty;
    }

    /**
     * Converts a solid grocery from std unit (kg) to specified unit via a division
     * factor lookup in the solidConversions array.
     * 
     * @param {*} quantity 
     * @param {String} unit 
     * @returns 
     */
    deconvertSolidUnit(quantity, unit) {
        if (unit == 'kg') {
            return quantity;
        }

        var divFactor = UnitConverter.solidConversions[unit.toLowerCase()];
        var newQty = quantity/divFactor;
        return Math.round(newQty*1000)/1000;
    }

     /**
     * Converts a liquid grocery from std unit (L) to specified unit via a division
     * factor lookup in the liquidConversions array.
     * 
     * @param {*} quantity 
     * @param {String} unit 
     * @returns 
     */
    deconvertLiquidUnit(quantity, unit) {
        if (unit == 'L') {
            return quantity;
        }

        var divFactor = UnitConverter.liquidConversions[unit.toLowerCase()];
        var newQty = quantity/divFactor;
        return Math.round(newQty*1000)/1000;
    }

}

module.exports = new UnitConverter();