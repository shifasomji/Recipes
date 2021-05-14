/**
 * This class will perform a client call to the verify API, 
 * using a list of categories(this list is useful for veryfi to map
 * the receipt items into categories i.e food, alcohol e.t.c), and a receipt URI.
 * 
 * The methods in this class will create a list of receiptItems which will be accessed
 * by our different component - the inventory manager 
 */
var receiptFileCollector = require('../receipt-scanner/receiptFileCollector');
var receiptItem = require('../receipt-scanner/receiptItem')
var fromcollector = new receiptFileCollector()
const request = require("request");
var fs = require("fs");

class receiptDataExtractor {
    theReceiptUri;
    categories;
    extractedData;
    receiptItemList;

    /**
     * 
     * @param {a recipt uri/ image path of type string} theUri 
     * 
     */

    constructor(theUri) {
        this.theReceiptUri = theUri;
        this.categories = []
        this.extractedData = {}
        this.receiptItemList = []
    }

    /**
     * 
     * @param {json object with veryfi API parameters and httsps link*} options 
     * This is a helper method for the makeveryfiRequest method. I make a POST request to veryfi 
     * and use a promise function to ensure that the we wait for the receipt to be processed for
     * data extraction
     * @returns None 
     */

    async doRequest(options) {

        return new Promise(function (resolve, reject) {
            try {
                request(options, function (error, res, body) {

                    if (!error && ((res.statusCode == 200) || (res.statusCode == 201) || (res.statusCode == 202))) {

                        resolve(body);
                    } else {
                        reject(error);
                    }
                });
            }
            catch (e) {
                console.log("unable to submit the file, try again")
            }
        });

    }
    /**
     * This an async method that sets all the needed parameters for verify API in options and calls doRequest to make  
     * a POST request and wait until the receipt is processed
     */

    async makeVeryfiRequest() {
        // this is a list parameter for veryfi to help categorize items in the receipt
        this.categories = ["food", "alcohol", "fees", "toiletries", "miscelenous"]
        var imagePath = this.theReceiptUri;

        // create a bas64 encoded file object using the image for a parameter for veryfi 
        var base64str = fs.readFileSync(imagePath, 'base64');

        // set fileName to the receipt uri, ideally we could have a method to condense a long receiptUri
        var fileName = this.theReceiptUri //"IMG_4857.jpeg";
        var jsonData = {
            file_data: base64str,
            file_name: fileName,
            categories: this.categories,
            boost_mode: 1
        };

        var USER_NAME = "kennnethcrystal";
        var API_KEY = "c4c919165b22663ba28d945e39091b34";
        var CLIENT_ID = "vrfwIHukZL0nUZb8UBLNuGaVLlNO5vZsPxXn9Kw";
        var ENVIRONMENT_URL = "api.veryfi.com";

        var options = {
            method: "POST",
            uri: "https://" + ENVIRONMENT_URL + "/api/v7/partner/documents/",
            family: 4,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "CLIENT-ID": CLIENT_ID,
                "AUTHORIZATION": `apikey ${USER_NAME}:${API_KEY}`
            },
            json: jsonData
        };
        // call doReqeust and set it to the extractedData variable
        this.extractedData = await this.doRequest(options);
    }


    /**
     * 
     * @returns the json extracted data
     */

    getExtractedData() {
        return this.extractedData
    }

    /**
     * 
     * @param {json file from veryfi request body} theData 
     * This method populates a list of receiptItems by looping through line items in the veryfi
     * json file and collecting description as a string , quantity as integer, and units of measure as string
     * if there are no units available it sets it to an empty string 
     * 
     * @returns a list of receiptItems that qualify with a category tag of e.g food, bevearages, produce, e.t.c
     */


    createReceiptItemList(theData) {
        var lineItems = [];
        lineItems = theData.line_items;

        for (var i = 0; i < lineItems.length; i++) {
            // check if the item tag is not a charge/fee, alcohol/beer, toiletries, and other miscelenous
            if (lineItems[i].type != "fee" && lineItems[i].type != "alcohol" && lineItems[i].type != "toiletries"
                && lineItems[i].type != "miscelenous") {

                var item = new receiptItem();
                var desc = lineItems[i].description;
                var quant = lineItems[i].quantity;
                var units = lineItems[i].unit_of_measure;
                if (desc != null) {
                    item.setDescription(desc.toLowerCase());
                }
                else {
                    item.setDescription("");
                }

                if (quant != null) {
                    item.setQuantity(quant);
                }
                else {
                    item.setQuantity("");
                }

                if (units != null) {
                    item.setUnits(units.toLowerCase());
                }
                else {
                    item.setUnits("");
                }
                this.receiptItemList.push(item);
            }
        }

        return this.receiptItemList
    }

}
module.exports = receiptDataExtractor;