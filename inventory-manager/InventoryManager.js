const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./local-storage');

var unitConverter = require("./UnitConverter.js");
var categoryManager = require('./CategoryManager');

var GroceryItem = require("./GroceryItem.js");
var StandardGroceryItem = require("./StandardGroceryItem.js");

var isInMocha = typeof(it) === 'function';
var receiptProcessor = isInMocha ? require("./MockUI.js") : require('receiptProcessor-pathname'); // change this

/**
 * See revisions.txt for revisions made in Phases 3 and 4. 
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
 * The Inventory Manager updates grocery inventory contents. 
 */
class InventoryManager {
    /**
     * Converts receipt items to StandardGroceryItems and adds them
     * to inventory.
     * 
     * Calls filterUnknownReceiptItem(). For each unknown receipt item,
     * calls UserInteractive for a user-translated receiptItem containing
     * the information necessary to instantiate a GroceryItem. 
     * Calls the standardizeUnits() method in the UnitConverter class
     * to convert each GroceryItem to a StandardGroceryItem prior to addition, 
     * then adds the StandardGroceryItems to the user's inventory 
     * (ReactNative local storage).  
     * 
     * @param {Object[]} receiptItems - Array of receipt items 
     * (e.g., {name: <name>, quantity: <quantity>, unit: <unit>}) to be added.  
     */
    addToInventory(receiptItems){   
      var unknownIngredients = this.filterUnknownReceiptItem(receiptItems);
      var groceryItems = [];

      for (var receiptItem of receiptItems) {
         var groceryItem;
         if (unknownIngredients.includes(receiptItem)) {
            var verifiedItem = receiptProcessor.translateItem(receiptItem); 

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
     * Precondition: all items in input array are recognized -- U/I
     * enforces this precondition; it does not call reduceInventory() unless
     * precondition is met. 
     * 
     * Directly instantiates GroceryItems using information from recipe items. 
     * Calls the standardizeUnits() method in the UnitConverter class to convert 
     * GroceryItems to StandardGroceryItems prior to deduction, then subtracts the 
     * StandardGroceryItems from the user's inventory. 
     * 
     * StandardGroceryItem entries will be updated for quantity. If the quantity 
     * to be deducted matches the inventory qty, the StandardGroceryItem key will
     * be deleted. 
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
     * Loops through local storage, converting each stored item
     * to a StandardGroceryItem and adding it to the list to be
     * returned. 
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
     * Precondition: verifyInInventory() returns true. 
     * 
     * @param {String} itemName 
     * @returns - quantity of inventory item of name itemName in the unit requested. 
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
     * NOTE: May hold translations from different stores. For the 1.0
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
     * or if the item's units are not defined (unit == ''), the receipt item will be added
     * to the list to return. 
     * 
     * Returns an empty list if all receipt items in the input list are recognized. 
     * 
     * @param {Object[]} receiptItems - Array of receiptItems. 
     * @returns - Array of unknown receiptItems. 
     */
    filterUnknownReceiptItem(receiptItems){
       var unknownItems = [];
       for (var receiptItem of receiptItems){
          if (this.translateReceiptItem(receiptItem.name) == 'unknown' || receiptItem.unit == ''){
             unknownItems.push(receiptItem);
          }
       }
       return unknownItems;
    }
    /**
     * Translates a receipt item name to a GroceryItem name via a lookup in the 
     * receiptItemToGroceryItem array. Returns 'unknown' if not found.
     *  
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

const inventoryManager = new InventoryManager();

// special export for testing
if (typeof(global.it) == 'function') {
   inventoryManager._ = {
      receiptItemTranslations: InventoryManager.receiptItemTranslations
   };
}

module.exports = inventoryManager;