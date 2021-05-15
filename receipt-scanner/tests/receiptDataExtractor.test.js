
var receiptFileCollector = require('../receiptFileCollector');
var receiptDataExtractor = require('../receiptDataExtractor')
var receiptItem = require('../receiptItem');

const assert = require('chai').assert;

testCollector = new receiptFileCollector();
testReceiptItem = new receiptItem();



// instantiate a test version for data extractor with receipt uri from testCollector (hardcoded in for now)
testDataExtractor = new receiptDataExtractor("../tests/IMG_4857.jpeg");

// I create receiptItems from looking at a receipt and test them against the data extracted by veryfi

describe ("testing data extracted by veryfi ", function() {

      it("tests item values: description, quantity, units from receipt", async () => {

        testReceiptItemList = []
        await testDataExtractor.makeVeryfiRequest() 
        extractedData = testDataExtractor.getExtractedData()

        receiptItemListFromExtractor = testDataExtractor.createReceiptItemList(extractedData)

        receiptItem1 = new thereceiptItem()
        receiptItem1.setDescription("broccoli slaw")
        receiptItem1.setQuantity(1)
        receiptItem1.setUnits("")

        receiptItem2 = new receiptItem()
        receiptItem2.setDescription("organic green lg bell pepp")
        receiptItem2.setQuantity(2)
        receiptItem2.setUnits("")

        receiptItem3 = new receiptItem()
        receiptItem3.setDescription("org hothouse tomato")
        receiptItem3.setQuantity(1.55)
        receiptItem3.setUnits("lb")

        receiptItem4 = new receiptItem()
        receiptItem4.setDescription("org orange bell pepp")
        receiptItem4.setQuantity(2)
        receiptItem4.setUnits("")

        receiptItem5 = new receiptItem()
        receiptItem5.setDescription("org ylw bell peppers")
        receiptItem5.setQuantity(1)
        receiptItem5.setUnits("")

        receiptItem6 = new receiptItem()
        receiptItem6.setDescription("russes potatoes")
        receiptItem6.setQuantity(1)
        receiptItem6.setUnits("lb")


        receiptItem7 = new receiptItem()
        receiptItem7.setDescription("yellow bananas")
        receiptItem7.setQuantity(2.04)
        receiptItem7.setUnits("lb")


        receiptItem8 = new receiptItem()
        receiptItem8.setDescription("yellow onions")
        receiptItem8.setQuantity(2.98)
        receiptItem8.setUnits("lb")

        receiptItem9 = new receiptItem()
        receiptItem9.setDescription("kaiser rolls")
        receiptItem9.setQuantity(1)
        receiptItem9.setUnits("")

        testReceiptItemList = [receiptItem1, 
            receiptItem2, 
            receiptItem3,
            receiptItem4,
            receiptItem5,
            receiptItem6,
            receiptItem7,
            receiptItem8,
            receiptItem9]
        
        for (var i = 0; i < testReceiptItemList.length; i++) {
            assert.deepEqual(receiptItemListFromExtractor[i].getItemDescription(), testReceiptItemList[i].getItemDescription())
            assert.deepEqual(receiptItemListFromExtractor[i].getItemQuantity(), testReceiptItemList[i].getItemQuantity())
            assert.deepEqual( receiptItemListFromExtractor[i].getItemUnits(), testReceiptItemList[i].getItemUnits())
        }

       
        
      }).timeout(30000)

});

