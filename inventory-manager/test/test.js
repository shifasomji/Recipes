var assert = require('assert');

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./local-storage');

var inventoryManager = require("../InventoryManager.js")
var unitConverter = require("../UnitConverter.js")
var categoryManager = require('../CategoryManager.js'); 

var GroceryItem = require("../GroceryItem.js")
var StandardGroceryItem = require("../StandardGroceryItem.js")
const { addTranslation } = require('../InventoryManager.js')

describe("Test: Inventory-Manager", function() {
  describe("Test: UnitConverter.js", function() {
    it("Converting from non-std to std units: one solid item + one liquid item", function() {
      categoryManager.addCategoryMapping('lettuce', 'produce');
      categoryManager.addCategoryMapping('orange juice', 'beverages');

      var groceryItems = [];
      var groceryItem1 = new GroceryItem("lettuce", 3, "lb");
      var groceryItem2 = new GroceryItem("orange juice", 2, "qt");

      groceryItems.push(groceryItem1);
      groceryItems.push(groceryItem2);

      var stdgroceryItems = [];
      var stdgroceryItem1 = new StandardGroceryItem("lettuce", 1.362, "produce"); 
      var stdgroceryItem2 = new StandardGroceryItem("orange juice", 1.892, "beverages");

      stdgroceryItems.push(stdgroceryItem1);
      stdgroceryItems.push(stdgroceryItem2);

      assert.deepStrictEqual(unitConverter.standardizeUnits(groceryItems), stdgroceryItems);
    })

    it("Converting from std to std units: one solid item + one liquid item", function() {
      var groceryItems = [];
      var groceryItem1 = new GroceryItem("lettuce", 3, "kg");
      var groceryItem2 = new GroceryItem("orange juice", 2, "L");

      groceryItems.push(groceryItem1);
      groceryItems.push(groceryItem2);

      var stdgroceryItems = [];
      var stdgroceryItem1 = new StandardGroceryItem("lettuce", 3, "produce") 
      var stdgroceryItem2 = new StandardGroceryItem("orange juice", 2, "beverages")

      stdgroceryItems.push(stdgroceryItem1);
      stdgroceryItems.push(stdgroceryItem2);

      assert.deepStrictEqual(unitConverter.standardizeUnits(groceryItems), stdgroceryItems);
    })

    it("Converting from non-std/std to std units: one solid item (non-std) + one liquid item (std)", function() {
      var groceryItems = [];
      var groceryItem1 = new GroceryItem("lettuce", 3, "kg");
      var groceryItem2 = new GroceryItem("orange juice", 2, "qt");

      groceryItems.push(groceryItem1);
      groceryItems.push(groceryItem2);

      var stdgroceryItems = [];
      var stdgroceryItem1 = new StandardGroceryItem("lettuce", 3, "produce") 
      var stdgroceryItem2 = new StandardGroceryItem("orange juice", 1.892, "beverages")

      stdgroceryItems.push(stdgroceryItem1);
      stdgroceryItems.push(stdgroceryItem2);

      assert.deepStrictEqual(unitConverter.standardizeUnits(groceryItems), stdgroceryItems);
    })
  })

  describe("Test: InventoryManager.js", function() {
    beforeEach(() => {
      for (let p in inventoryManager._.receiptItemTranslations) {
        delete inventoryManager._.receiptItemTranslations[p];
      } 
      
      inventoryManager._.receiptItemTranslations["targe eggs"] = "eggs";
      inventoryManager._.receiptItemTranslations["peanut butter creamy no stir"] = "peanut butter";
      inventoryManager._.receiptItemTranslations["tofu tj-san firm org 14 oz"] = "tofu";
      inventoryManager._.receiptItemTranslations["homogenized milk - quart"] = "milk";
      
      for (let p in categoryManager._.categoryMappings) {
        delete categoryManager._.categoryMappings[p];
      } 

      categoryManager._.categoryMappings["chicken breast"] = "protein";
      categoryManager._.categoryMappings["lettuce"] = "produce";
      categoryManager._.categoryMappings["orange juice"] = "beverages";
      categoryManager._.categoryMappings["tofu"] = "protein";
      categoryManager._.categoryMappings["milk"] = "dairy";

      localStorage.clear();
    });

    describe("Test: translateReceiptItem() and addTranslation()", function() {
      it("Translating unknown item", function() {
        var receiptItem = {"name":"Trader Joe's Baby Spinach", "quantity":7, "unit":"oz"}; 
        assert.strictEqual(inventoryManager.translateReceiptItem(receiptItem.name), "unknown");
      
      })

      it("Translating unknown item after adding translation", function() {
        var receiptItem = {"name":"Trader Joe's Baby Spinach", "quantity":7, "unit":"oz"}; 
        addTranslation("Trader Joe's Baby Spinach", "spinach");
        assert.strictEqual(inventoryManager.translateReceiptItem(receiptItem.name), "spinach");
      
      })

      it("Translating known item", function() {
        var receiptItem = {"name":"targe eggs", "quantity":7, "unit":"none"}; 
        assert.strictEqual(inventoryManager.translateReceiptItem(receiptItem.name), "eggs");
      })
    })

    describe("Test: filterUnknownReceiptItem()", function() {
      it("Filtering unrecognized items: two", function() {
        var receiptItems = [];
        var unrecognizedItems = [];

        var receiptItem1 = {"name":"Oatmeal Instant Maple Brn Sgr", "quantity":1, "unit":"none"}; 
        var receiptItem2 = {"name":"Tofu Baked Org Teriyaki", "quantity":2, "unit":"lb"};
        var receiptItem3 = {"name":"homogenized milk - quart", "quantity":2, "unit":""};
        
        receiptItems.push(receiptItem1);
        receiptItems.push(receiptItem2);
        receiptItems.push(receiptItem3);

        unrecognizedItems.push(receiptItem1);
        unrecognizedItems.push(receiptItem2);
        unrecognizedItems.push(receiptItem3);

        assert.deepStrictEqual(inventoryManager.filterUnknownReceiptItem(receiptItems), unrecognizedItems);
      })

      it("Filtering recognized items: two", function() {
        var receiptItems = [];
        var unrecognizedItems = [];

        var receiptItem1 = {"name":"targe eggs", "quantity":7, "unit":"none"}; 
        var receiptItem2 = {"name":"peanut butter creamy no stir", "qty":7, "unit":"oz"};
        var receiptItem3 = {"name":"homogenized milk - quart", "quantity":2, "unit":"qt"};
        
        receiptItems.push(receiptItem1);
        receiptItems.push(receiptItem2);
        receiptItems.push(receiptItem3);

        assert.deepStrictEqual(inventoryManager.filterUnknownReceiptItem(receiptItems), unrecognizedItems);
      })

      it("Filtering recognized/unrecognized items: one recognized, one unrecognized", function() {
        var receiptItems = [];
        var unrecognizedItems = [];
  
        var receiptItem1 = {"name":"targe eggs", "quantity":7, "unit":"lb"}; 
        var receiptItem2 = {"name":"Trader Joe's Baby Spinach", "quantity":7, "unit":"oz"};
        
        receiptItems.push(receiptItem1);
        receiptItems.push(receiptItem2);
  
        unrecognizedItems.push(receiptItem2);
        assert.deepStrictEqual(inventoryManager.filterUnknownReceiptItem(receiptItems), unrecognizedItems);
      })
    })

    describe("Test: verifyInInventory() and getItemQuantity()", function() {
      it("Verifying existing item and retrieving std quantity", function() {
        var stdGroceryItem = new StandardGroceryItem("lettuce", 1.362, "produce");
        var itemName = stdGroceryItem.name.toLowerCase();

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem.quantity,
          category: stdGroceryItem.category
        });
        localStorage.setItem(itemName, stdGroceryItem1Json);

        assert.deepStrictEqual(inventoryManager.verifyInInventory(itemName), true);
        assert.deepStrictEqual(inventoryManager.getItemQuantity(itemName, "kg"), 1.362);
      })

      it("Verifying existing item and retrieving non-std quantity", function() {
        var stdGroceryItem = new StandardGroceryItem("milk", 1.5, "dairy");
        var itemName = stdGroceryItem.name.toLowerCase();

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem.quantity,
          category: stdGroceryItem.category
        });
        localStorage.setItem(itemName, stdGroceryItem1Json);

        assert.deepStrictEqual(inventoryManager.verifyInInventory(itemName), true);
        assert.deepStrictEqual(inventoryManager.getItemQuantity(itemName, "mL"), 1500);
        assert.deepStrictEqual(inventoryManager.getItemQuantity(itemName, "qt"), 1.586);
      })

      it("Verifying nonexistent item", function() {
        var stdGroceryItem = new StandardGroceryItem("orange juice", 2.983, "beverages");
        var itemName = stdGroceryItem.name.toLowerCase();

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem.quantity,
          category: stdGroceryItem.category
        });
        localStorage.setItem(itemName, stdGroceryItem1Json);

        assert.deepStrictEqual(inventoryManager.verifyInInventory("organic orange juice"), false);
      })
    })

    describe("Test: addToInventory()", function() {
      it("Adding recognized, existing items with std/non-std units", function() {
        var stdGroceryItem1 = new StandardGroceryItem("tofu", 0.055, "protein");
        var stdGroceryItem2 = new StandardGroceryItem("milk", 1.892, "dairy");
        var stdGroceryItem3 = new StandardGroceryItem("chicken breast", 1.578, "protein");

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem1.quantity,
          category: stdGroceryItem1.category
        });
        localStorage.setItem(stdGroceryItem1.name.toLowerCase(), stdGroceryItem1Json);
        
        const stdGroceryItem2Json = JSON.stringify({
          quantity: stdGroceryItem2.quantity,
          category: stdGroceryItem2.category
        });
        localStorage.setItem(stdGroceryItem2.name.toLowerCase(), stdGroceryItem2Json);
       
        const stdGroceryItem3Json = JSON.stringify({
          quantity: stdGroceryItem3.quantity,
          category: stdGroceryItem3.category
        });
        localStorage.setItem(stdGroceryItem3.name.toLowerCase(), stdGroceryItem3Json);

        var receiptItems = [];
        var receiptItem1 = {name: "tofu tj-san firm org 14 oz", quantity: 14, unit: "oz"};
        var receiptItem2 = {name: "homogenized milk - quart", quantity: 1, unit: "qt"};

        receiptItems.push(receiptItem1);
        receiptItems.push(receiptItem2);

        inventoryManager.addToInventory(receiptItems);

        var inventoryContents = [new StandardGroceryItem("tofu", 0.451, "protein"), 
          new StandardGroceryItem("milk", 2.838, "dairy"),
          new StandardGroceryItem("chicken breast", 1.578, "protein")];

        assert.deepStrictEqual(inventoryManager.listInventory(), inventoryContents);
      })
    })

    describe("Test: addToInventory() and CategoryManager's addCategoryMapping()", function() {
      it("Adding unrecognized, non-existent items with std/non-std units.", function() {
        var receiptItems = [];
        var receiptItem1 = {name: "Organic Tom. Basil Spag. Sauce", quantity: 14, unit: "oz"};
        // var receiptItem2 = {name: "A-Pear Each Bartlett", quantity: 3, unit: "none"};
        var receiptItem3 = {name: "choc covered pretzel slims", quantity: 60, unit: "g"};

        receiptItems.push(receiptItem1);
        // receiptItems.push(receiptItem2);
        receiptItems.push(receiptItem3);

        // console.log(">>> categoryTranslations", categoryManager._.categoryMappings);
        inventoryManager.addToInventory(receiptItems);
        // console.log(">>> translations", inventoryManager._.receiptItemTranslations);
        // console.log(">>> categoryTranslations", categoryManager._.categoryMappings);

        // modify quantities with conversions
        // add another parameter for std grocery item? to check if there are units
        var inventoryContents = [new StandardGroceryItem("spaghetti sauce", 0.509, "miscellaneous"), 
          new StandardGroceryItem("chocolate pretzels", 0.075, "snacks")];
          // new StandardGroceryItem("pear", __, "produce")];

        assert.deepStrictEqual(categoryManager._.categoryMappings["spaghetti sauce"], "miscellaneous");
        assert.deepStrictEqual(categoryManager._.categoryMappings["chocolate pretzels"], "snacks");
        
        assert.deepStrictEqual(inventoryManager.listInventory(), inventoryContents);
      })

      it("Adding recognized/unrecognized, existing/non-existent items with std/non-std units.", function() {
        var stdGroceryItem1 = new StandardGroceryItem("tofu", 0.055, "protein");

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem1.quantity,
          category: stdGroceryItem1.category
        });
        localStorage.setItem(stdGroceryItem1.name.toLowerCase(), stdGroceryItem1Json);

        var receiptItems = [];
        var receiptItem1 = {name: "Organic Tom. Basil Spag. Sauce", quantity: 14, unit: "oz"};
        var receiptItem2 = {name: "homogenized milk - quart", quantity: 1, unit: "qt"};
        var receiptItem3 = {name: "tofu tj-san firm org 14 oz", quantity: 0.3962, unit: "kg"};

        receiptItems.push(receiptItem1);
        receiptItems.push(receiptItem2);
        receiptItems.push(receiptItem3);

        inventoryManager.addToInventory(receiptItems);

        var inventoryContents = [new StandardGroceryItem("spaghetti sauce", 0.509, "miscellaneous"), 
          new StandardGroceryItem("milk", 0.946, "dairy"),
          new StandardGroceryItem("tofu", 0.451, "protein")];
        
        assert.deepStrictEqual(categoryManager._.categoryMappings["spaghetti sauce"], "miscellaneous");

        var actualInventory = inventoryManager.listInventory().sort((a, b) => (a.name > b.name) ? 1 : -1);
        var predictedInventory = inventoryContents.sort((a, b) => (a.name > b.name) ? 1 : -1);
        assert.deepStrictEqual(predictedInventory, actualInventory);
      })
    })


    describe("Test: reduceInventory()", function() {
      it("Deduct quantity < current quantity, non-std units: two solid items, one liquid item", function() {
        var stdGroceryItem1 = new StandardGroceryItem("lettuce", 1.362, "produce");
        var stdGroceryItem2 = new StandardGroceryItem("orange juice", 1.892, "beverages");
        var stdGroceryItem3 = new StandardGroceryItem("chicken breast", 1.578, "protein");

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem1.quantity,
          category: stdGroceryItem1.category
        });
        localStorage.setItem(stdGroceryItem1.name.toLowerCase(), stdGroceryItem1Json);
        
        const stdGroceryItem2Json = JSON.stringify({
          quantity: stdGroceryItem2.quantity,
          category: stdGroceryItem2.category
        });
        localStorage.setItem(stdGroceryItem2.name.toLowerCase(), stdGroceryItem2Json);

        const stdGroceryItem3Json = JSON.stringify({
          quantity: stdGroceryItem3.quantity,
          category: stdGroceryItem3.category
        });
        localStorage.setItem(stdGroceryItem3.name.toLowerCase(), stdGroceryItem3Json);

        var recipeItems = [];
        var recipeItem1 = {name: "lettuce", quantity: 0.5, unit: "lb"};
        var recipeItem2 = {name: "orange juice", quantity: 0.5 , unit: "qt"};
        recipeItems.push(recipeItem1);
        recipeItems.push(recipeItem2);

        inventoryManager.reduceInventory(recipeItems);
                               
        var inventoryContents = [new StandardGroceryItem("lettuce", 1.135, "produce"), 
          new StandardGroceryItem("orange juice", 1.419, "beverages"),
          new StandardGroceryItem("chicken breast", 1.578, "protein")];

        assert.deepStrictEqual(inventoryManager.listInventory(), inventoryContents);
      })

      it("Deduct quantity < current quantity, std units: two solid items, one liquid item", function() {
        var stdGroceryItem1 = new StandardGroceryItem("lettuce", 1.362, "produce");
        var stdGroceryItem2 = new StandardGroceryItem("orange juice", 1.892, "beverages");
        var stdGroceryItem3 = new StandardGroceryItem("chicken breast", 1.578, "protein");

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem1.quantity,
          category: stdGroceryItem1.category
        });
        localStorage.setItem(stdGroceryItem1.name.toLowerCase(), stdGroceryItem1Json);
        
        const stdGroceryItem2Json = JSON.stringify({
          quantity: stdGroceryItem2.quantity,
          category: stdGroceryItem2.category
        });
        localStorage.setItem(stdGroceryItem2.name.toLowerCase(), stdGroceryItem2Json);
       
        const stdGroceryItem3Json = JSON.stringify({
          quantity: stdGroceryItem3.quantity,
          category: stdGroceryItem3.category
        });
        localStorage.setItem(stdGroceryItem3.name.toLowerCase(), stdGroceryItem3Json);

        var recipeItems = [];
        var recipeItem1 = {name: "lettuce", quantity: 0.5, unit: "kg"};
        var recipeItem2 = {name: "orange juice", quantity: 0.5, unit: "L"};
        recipeItems.push(recipeItem1);
        recipeItems.push(recipeItem2);

        inventoryManager.reduceInventory(recipeItems);
                                 
        var inventoryContents = [new StandardGroceryItem("lettuce", 0.862, "produce"), 
          new StandardGroceryItem("orange juice", 1.392, "beverages"),
          new StandardGroceryItem("chicken breast", 1.578, "protein")];

        assert.deepStrictEqual(inventoryManager.listInventory(), inventoryContents);
      })

      it("Deduct quantity = current quantity, non-std units: two solid items, one liquid item", function() {
        var stdGroceryItem1 = new StandardGroceryItem("lettuce", 1.362, "produce");
        var stdGroceryItem2 = new StandardGroceryItem("orange juice", 1.875, "beverages");
        var stdGroceryItem3 = new StandardGroceryItem("chicken breast", 1.578, "protein");

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem1.quantity,
          category: stdGroceryItem1.category
        });
        localStorage.setItem(stdGroceryItem1.name.toLowerCase(), stdGroceryItem1Json);
        
        const stdGroceryItem2Json = JSON.stringify({
          quantity: stdGroceryItem2.quantity,
          category: stdGroceryItem2.category
        });
        localStorage.setItem(stdGroceryItem2.name.toLowerCase(), stdGroceryItem2Json);

        const stdGroceryItem3Json = JSON.stringify({
          quantity: stdGroceryItem3.quantity,
          category: stdGroceryItem3.category
        });
        localStorage.setItem(stdGroceryItem3.name.toLowerCase(), stdGroceryItem3Json);

        var recipeItems = [];
        var recipeItem1 = {name: "lettuce", quantity: 0.5, unit: "lb"};
        var recipeItem2 = {name: "orange juice", quantity: 1.982, unit: "qt"};
        recipeItems.push(recipeItem1);
        recipeItems.push(recipeItem2);

        inventoryManager.reduceInventory(recipeItems);
        
        var inventoryContents = [new StandardGroceryItem("lettuce", 1.135, "produce"), 
          new StandardGroceryItem("chicken breast", 1.578, "protein")];

        assert.deepStrictEqual(inventoryManager.listInventory(), inventoryContents);
      })

      it("Deduct quantity = current quantity, std units: two solid items, one liquid item", function() {
        var stdGroceryItem1 = new StandardGroceryItem("lettuce", 1.362, "produce");
        var stdGroceryItem2 = new StandardGroceryItem("orange juice", 1.875, "beverages");
        var stdGroceryItem3 = new StandardGroceryItem("chicken breast", 1.578, "protein");

        const stdGroceryItem1Json = JSON.stringify({
          quantity: stdGroceryItem1.quantity,
          category: stdGroceryItem1.category
        });
        localStorage.setItem(stdGroceryItem1.name.toLowerCase(), stdGroceryItem1Json);
        
        const stdGroceryItem2Json = JSON.stringify({
          quantity: stdGroceryItem2.quantity,
          category: stdGroceryItem2.category
        });
        localStorage.setItem(stdGroceryItem2.name.toLowerCase(), stdGroceryItem2Json);

        const stdGroceryItem3Json = JSON.stringify({
          quantity: stdGroceryItem3.quantity,
          category: stdGroceryItem3.category
        });
        localStorage.setItem(stdGroceryItem3.name.toLowerCase(), stdGroceryItem3Json);

        var recipeItems = [];
        var recipeItem1 = {name: "lettuce", quantity: 0.5, unit: "kg"};
        var recipeItem2 = {name: "orange juice", quantity: 1.875123489, unit: "L"};
        recipeItems.push(recipeItem1);
        recipeItems.push(recipeItem2);

        inventoryManager.reduceInventory(recipeItems);
        
        var inventoryContents = [new StandardGroceryItem("lettuce", 0.862, "produce"), 
          new StandardGroceryItem("chicken breast", 1.578, "protein")];

        assert.deepStrictEqual(inventoryManager.listInventory(), inventoryContents);
      })
    })
  })
})

// run in terminal: npm test
