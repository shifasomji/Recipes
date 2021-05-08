receiptDataExtractor = require('../screens/receiptDataExtractor');
receiptItem = require('../screens/receiptItem');
receiptFileCollector = require('../screens/receiptFileCollector');
const assert = require('chai').assert;

testCollector = new receiptFileCollector();
testReceiptItem = new receiptItem();



// instantiate a test version for data extractor with receipt uri from testCollector
testDataExtractor = new receiptDataExtractor(testCollector.getFileUri());

// I create receiptItems from looking at a receipt and test them against the data extracted by veryfi

describe ("testing data extracted by veryfi ", function() {
      it("tests item values: description, quantity, units from receipt", function(){
        testReceiptItemList = []
        extractedData = testDataExtractor.makeVeryfiRequest()

        receiptItemListFromExtractor = testDataExtractor.createReceiptItemList(extractedData)

        receiptItem1 = new receiptItem()
        receiptItem1.setDescription("broccoli slaw")
        receiptItem1.setQuantity("1.0")
        receiptItem1.setUnits("")

        receiptItem2 = new receiptItem()
        receiptItem2.setDescription("organic green lg bell pepp")
        receiptItem2.setQuantity("2.0")
        receiptItem2.setUnits("")

        receiptItem3 = new receiptItem()
        receiptItem3.setDescription("organic hot house tomato")
        receiptItem3.setQuantity("1.55")
        receiptItem3.setUnits("lb")

        receiptItem4 = new receiptItem()
        receiptItem4.setDescription("")
        receiptItem4.setQuantity("")
        receiptItem4.setUnits("")

        receiptItem5 = new receiptItem()
        receiptItem5.setDescription("organic orange bell pepp")
        receiptItem5.setQuantity("2.0")
        receiptItem5.setUnits("")

        receiptItem6 = new receiptItem()
        receiptItem6.setDescription("org ylw bell peppers")
        receiptItem6.setQuantity("1.0")
        receiptItem6.setUnits("")


        receiptItem7 = new receiptItem()
        receiptItem7.setDescription("russel potatoes")
        receiptItem7.setQuantity("1.0")
        receiptItem7.setUnits("lb")

        receiptItem8 = new receiptItem()
        receiptItem8.setDescription("yellow onions")
        receiptItem8.setQuantity("2.98")
        receiptItem8.setUnits("lb")

        receiptItem9 = new receiptItem()
        receiptItem9.setDescription("kaiser rolls")
        receiptItem9.setQuantity("1.0")
        receiptItem9.setUnits("")

        testReceiptItemList = [receiptItem1, 
            receiptItem2, 
            receiptItem3, 
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

      });


// The following are trivial tests to ensure that the functions that launch the image and the camera work correctly

describe("testing ReceiptFileCollector with pick from camera/gallery", function() { 
    it("test if user provides permissions to access camera and provides a photo ", function() {
        assert.equal(testCollector.uriFromCamIsPresent(), true)
        assert.isString(testCollector.getFileUri(), "string uri")
        assert.isNotNull(testCollector.getFileUri(), "uri not null")
        
       });

    it("if user provides permissions to access camera but cancels without a photo", function() {
        assert.equal(testCollector.uriFromCamIsPresent(), false)
        assert.equal(testCollector.getFileUri(), "")
    });


    it( "if user provides perms to access gallery and selects to use a picture", function() {
    assert.equal(testCollector.uriFromGalleryIsPresent(), true);
    assert.isString(testCollector.getFileUri(), "string uri")
    assert.isNotNull(testCollector.getFileUri(), "uri not null")
    });


    it("if user provides permissions to access gallery but cancels without selecting a picture", function()  {
    assert.equal(testCollector.uriFromGalleryIsPresent(), false);
    assert.equal(testCollector.getFileUri(), "")
    });
});


});