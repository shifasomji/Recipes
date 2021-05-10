/* The following are trivial tests to ensure that the functions that launch the image and the camera work correctly
* I created this tests as part of the construction process to simply check that the file uri is available at the 
* end of the function operations
*/

receiptFileCollector = require('../screens/receiptFileCollector');
const assert = require('chai').assert;
testCollector = new receiptFileCollector();


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