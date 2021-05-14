const inventoryManager = require('../inventory-manager/CategoryManager');
const receiptExtractor = require('../receipt-scanner/receiptDataExtractor');
const receiptCollector = require('../receipt-scanner/receiptFileCollector');
const recipeGenerator = require('../recipe-generator/RecipeGenerator');
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
      if (itemList[i].units == '') {
        itemList[i].units = 'oz';
      }
    }
    console.log(itemList);
  } catch (err) {
    console.error(err);
  }
}

start();
