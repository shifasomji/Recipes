const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./local-storage');

var unitConverter = require("./UnitConverter.js");
var categoryManager = require('./CategoryManager');

var GroceryItem = require("./GroceryItem.js");
var StandardGroceryItem = require("./StandardGroceryItem.js");

var isInMocha = typeof(it) === 'function';
var receiptProcessor = isInMocha ? require("./MockUI.js") : require('real-thing');

/**
 * *****
 * Revisions:
 * 
 * 1. The user's ingredients inventory is now implemented and maintained via
 * ReactNative local storage (key-value pairs).
 * https://www.robinwieruch.de/local-storage-react#local-storage-in-react
 * InventoryManager is no longer a client-server model, so MongoDB / Mongo 
 * shell scripting and the API layer specs have been eliminated. 
 * 
 * 2. Interactions between the U/I and updates for unknown receipt items have
 * been clarified in the pseudocode for addToInventory(). 
 * 
 * 3. InventoryManager now only interacts with the U/I component (does not receive
 * or return information to ReceiptScanner or RecipeGenerator). 
 * 
 * *****
 * Additional notes:
 * 
 * Regarding the first issue raised in my review report: I will still be creating 
 * the categories array in CategoryManager and the foodStates array in FoodStateManager
 * via manual inputting for the 1.0 release. I agree that automation is important;
 * however, it is not a priority and in my research, I have not been able to find
 * open-source databases of mappings from ingredient to ingredient category or 
 * ingredient to ingredient state that fit our needs. 
 * 
 * *****
 * Summary of interactions between all inventory-manager classes:
 * The GroceryItem class is used to construct GroceryItems. A 
 * GroceryItem attribute, the foodState (e.g., solid), is determined
 * by the FoodStateManager class. The UnitConverter class uses each
 * GroceryItem's foodState to convert GroceryItems to StandardGroceryItems
 * (via the StandardGroceryItem class). A StandardGroceryItem attribute,
 * the category (e.g., meat), is determined by the FoodStateManager class.
 * The InventoryManager class enumerates or perform updates to the 
 * user's StandardGroceryItem inventory. 
 * 
 * 
 * The Inventory Manager updates grocery inventory contents. 
 */
class InventoryManager {
    /**
     * Converts receipt items to StandardGroceryItems and adds them
     * to inventory.
     * 
     * Calls the standardizeUnits() method in the UnitConverter class
     * to convert GroceryItems to StandardGroceryItems prior to addition, 
     * then adds the StandardGroceryItems to the user's inventory 
     * (ReactNative local storage).  
     * 
     * @param {Object[]} receiptItems - Array of receipt items 
     * (e.g., {name: <name>, quantity: <quantity>, unit: <unit>}) to be added.  
     */
    addToInventory(receiptItems){   
      var unknownIngredients = this.filterUnknownReceiptItem(receiptItems);
      var groceryItems = [];

      for (var receiptItem of receiptItems){
         var groceryItem;
         if (unknownIngredients.includes(receiptItem)){
            // Actual code:
            var verifiedItem = receiptProcessor.translateItem(receiptItem); 

            // Testing code: 
            // var verifiedItem = mockUI.translateItem(receiptItem);

            categoryManager.addCategoryMapping(verifiedItem.name, verifiedItem.category);
            groceryItem = new GroceryItem(verifiedItem.name, verifiedItem.quantity, verifiedItem.unit);
            this.addTranslation(receiptItem.name, verifiedItem.name);
         } else {
            var translation = this.translateReceiptItem(receiptItem.name)
            groceryItem = new GroceryItem(translation, receiptItem.quantity, receiptItem.unit);
         }
         groceryItems.push(groceryItem);
      }

      var stdGroceryItems = unitConverter.standardizeUnits(groceryItems); 

      for (var stdGroceryItem of stdGroceryItems){
         var newQty = stdGroceryItem.quantity;
         var inventoryItem = localStorage.getItem(stdGroceryItem.name);

         if (inventoryItem != null){
            const val = JSON.parse(inventoryItem);
            newQty += val.quantity;
         } 

         newQty = Math.round(newQty*1000)/1000; // precision to thousandths place
         
         localStorage.setItem(stdGroceryItem.name, JSON.stringify({'quantity':newQty,
            'category':stdGroceryItem.category}));
      }
    }

    /**
     * Subtracts GroceryItems from inventory. 
     * 
     * Precondition: all items in input array are recognized. Direct instantiation
     * of GroceryItems using information from recipe items. 
     * 
     * Calls the standardizeUnits() method in the UnitConverter class to convert 
     * GroceryItems to StandardGroceryItems prior to deduction, then subtracts the 
     * StandardGroceryItems from the user's inventory. 
     * 
     * StandardGroceryItem entries will be updated for qty. If the qty to be deducted
     * matches the inventory qty, the StandardGroceryItem key will be deleted. 
     * 
     * No error handling performed (all errors will be addressed on the U/I end).
     * 
     * @param {Object[]} receiptItems - Array of receipt items 
     * (e.g., {name: <name>, quantity: <quantity>, unit: <unit>}) to be subtracted.  
     */
    reduceInventory(receiptItems){
      var groceryItems = [];
      for (var receiptItem of receiptItems){
         var groceryItem = new GroceryItem(receiptItem.name, receiptItem.quantity, receiptItem.unit);
         groceryItems.push(groceryItem);
      }

      var stdGroceryItems = unitConverter.standardizeUnits(groceryItems);

      for (var stdGroceryItem of stdGroceryItems) {
         var inventoryItem = localStorage.getItem(stdGroceryItem.name.toLowerCase());
         var currQty = JSON.parse(inventoryItem).quantity;
         var deductQty = stdGroceryItem.quantity;

         if (Math.abs(currQty - deductQty) < 0.01) { 
            localStorage.removeItem(stdGroceryItem.name.toLowerCase());
            continue;
         }

         var newQty = Math.round((currQty - deductQty)*1000)/1000;   // precision to thousandths place

         const newItemJson = JSON.stringify({
            'quantity':newQty,
            'category':stdGroceryItem.category
         });

         localStorage.setItem(stdGroceryItem.name.toLowerCase(), newItemJson);
      }
   }

    /**
     * Lists the contents of the inventory. 
     * 
     * Enumerates all attributes of each 
     * StandardGroceryItem (name, quantity, foodState, and category) by 
     * looping through local storage (examples in link below).
     * 
     * https://stackoverflow.com/questions/3138564/looping-through-localstorage-in-html5-and-javascript  
     *
     * @returns - complete list of inventory items. 
     */
    listInventory(){
       var contents = [];

       for (var i = 0; i < localStorage.length; i++){
          var key = localStorage.key(i);
          var val = JSON.parse(localStorage.getItem(key));
          var stdGroceryItem = new StandardGroceryItem(key, val.quantity, val.category); 
          contents.push(stdGroceryItem);
       }
       return contents;
    }

    /**
     * Determines whether an inventory item of name itemName exists in the inventory.
     * 
     * @param {String} itemName 
     * @returns - whether an inventory item of name itemName exists. 
     */
    verifyInInventory(itemName){
       for (var i = 0; i < localStorage.length; i++){
         var key = localStorage.key(i);
         if (key == itemName){
            return true;
         }
       }
       return false;  
    }

    /**
     * Determines the quantity of the inventory item of name itemName in the unit requested. 
     * Call only if verifyInInventory() returns true. 
     * 
     * @param {String} itemName 
     * @returns - quantity of inventory item of name itemName. 
     */
    getItemQuantity(itemName, unit){
      var queryUnit = unit.toLowerCase()
      var val = localStorage.getItem(itemName);
      var stdQty = JSON.parse(val).quantity;
      var qty;

      if (GroceryItem.solidUnits.includes(unit)) { 
         qty = unitConverter.deconvertSolidUnit(stdQty, queryUnit);
      } else {
         qty = unitConverter.deconvertLiquidUnit(stdQty, queryUnit);
      }
      return qty;
    }

    /**
     * Translations from receipt item name to GroceryItem name. 
     * <receiptItemName> : <GroceryItem.name>
     * 
     * NOTE: Holds translations from two different stores. For the 1.0
     * release, conflicting translations will not be anticipated/handled,
     * and thus store name will not be a recorded property. 
     */
    static receiptItemTranslations = {};

    /**
     * Determines which raw receipt items (from UserInteractive) need to be 
     * modified/verified by the user. Filters the input list and returns a new 
     * list containing all unrecognized receipt items (to undergo user modification). 
     * 
     * Calls translateReceiptItem on each item's name. If the call returns with 'unknown', 
     * the receipt item will be added to the list to return. 
     * 
     * Returns an empty list if all receipt items in the input list are recognized. 
     * 
     * @param {Object[]} receiptItems - Array of GroceryItems. 
     * @returns - Array of receiptItems. 
     */
    filterUnknownReceiptItem(receiptItems){
       var unknownItems = [];
       for (var receiptItem of receiptItems){
          if (this.translateReceiptItem(receiptItem.name) == 'unknown'){
             unknownItems.push(receiptItem);
          }
       }
       return unknownItems;
    }
    /**
     * Translates a receipt item name to a GroceryItem name via a lookup in the 
     * receiptItemToGroceryItem array. Returns 'unknown' if not found. 
     * @param {String} - Name of receipt item. 
     * @returns - Name of GroceryItem. 
     */
    translateReceiptItem(receiptItemName){
      const translation = InventoryManager.receiptItemTranslations[receiptItemName.toLowerCase()];
      return translation || 'unknown';
    }

    /**
     * Adds a key-value mapping (receipt item name, user-translated
     * GroceryItem name) to the receiptItemTranslations array.
     * 
     * @param {String} - Name of receipt item. 
     * @param {String} - User-translated name of GroceryItem. 
     */
    addTranslation(receiptItemName, groceryItemName){
       InventoryManager.receiptItemTranslations[receiptItemName.toLowerCase()] = groceryItemName;
    }
}

// const inventoryManager = new InventoryManager();
// export default inventoryManager;

// localStorage.setItem('xxx', JSON.stringify(object))
// const object = JSON.parse(localStorage.getItem('abc')) 

const inventoryManager = new InventoryManager();
if (typeof(global.it) == 'function') {
   inventoryManager._ = {
      receiptItemTranslations: InventoryManager.receiptItemTranslations
   };
}

module.exports = inventoryManager;