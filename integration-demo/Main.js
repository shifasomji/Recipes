const inventoryManager = require('../inventory-manager/InventoryManager');
const receiptExtractor = require('../receipt-scanner/receiptDataExtractor');
const receiptCollector = require('../receipt-scanner/receiptFileCollector');
const recipeGenerator = require('../recipe-generator/RecipeGenerator');
const prompt = require('prompt-sync')();

// import inventoryManager = require('../inventory-manager/CategoryManager');
// import receiptExtractor = require('../receipt-scanner/receiptDataExtractor');
// import receiptCollector = require('../receipt-scanner/receiptFileCollector');
// import recipeGenerator = require('../recipe-generator/RecipeGenerator');

// var collector = new receiptCollector();
// var imagePath = collector.getFileUri();
var extractor = new receiptExtractor("../receipt-scanner/IMG_4857.jpeg");

var itemList = [];
var extractedData;
var itemList;

const start = async function () {
  try {
    await extractor.makeVeryfiRequest();
    extractedData = extractor.getExtractedData();
    itemList = extractor.createReceiptItemList(extractedData);

    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].unit == '') {
        itemList[i].unit = 'oz';
      }
      // console.log("The ingredient is: " + itemList[i].name);
      // prompt("Please translate the receipt item name: ");
      // console.log("\nReceived!\n");
    }

    console.log(itemList);
    var inventory = new inventoryManager();
    inventory.addToInventory(itemList);
    var groceries = inventory.listInventory();

    var groceriesInventory = "";
    console.log("Here's your inventory \n");
    for (let i = 0; i < groceries.length; i++) {
      console.log("name: ", groceries[i].name + ", quantity: ", groceries[i].quantity + ", category: ", groceries[i].category, "\n");
      groceriesInventory += groceries[i].name;
    }

    console.log("This is what is in your inventory: \n");
    console.log(groceriesInventory);

    console.log("What ingredients do you want to cook with? \n");
    var ingred = 0;

    prompt("What ingredients ")
    var includeIngredients = [];


  } catch (err) {
    console.error(err);
  }
}

start();
