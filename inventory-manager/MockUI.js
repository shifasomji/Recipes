/**
 * Creates a mock of the UserInteractive component for testing purposes.
 * Simulates user verification of name, quantity, unit and category. 
 */
class MockUI {
    /**
     * Returns a user-verified receipt item (name, quantity,
     * unit and category are all approved by the user).
     * 
     * @param {Object} receiptItem - a raw receipt item. 
     * @returns - a user-verified receipt item. 
     */
    translateItem(receiptItem) {
        var name;
        var quantity;
        var unit;
        var category;

        if (receiptItem.name.toLowerCase() == "organic tom. basil spag. sauce") {
            name = "spaghetti sauce";
            quantity = 18;
            unit = "oz";
            category = "miscellaneous"
        } else if (receiptItem.name.toLowerCase() == "choc covered pretzel slims") {
            name = "chocolate pretzels";
            quantity = 75;
            unit = "g";
            category = "snacks";
        } 
        
        var verifiedItem = {name: name, quantity: quantity, unit: unit, category: category};
        return verifiedItem;
    }
}

module.exports = new MockUI();