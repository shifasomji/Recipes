receiptFileCollector = require( '../screens/receiptFileCollector');
fromcollector = new receiptFileCollector()

var request = require('request');
var fs = require('fs');


class receiptDataExtractor {
    theresponse;
    theReceiptUri;
    categories;
    extractedData;
    receiptItemList;

    constructor (theUri) {   
        this.theReceiptUri = theUri
        
    }


    makeVeryfiRequest()  {
        this.categories = ["food", "alcohol", "fees", "toiletries", "miscelenous"]

        var fileName = this.theReceiptUri; //'receipt.jpg';
        var filePath = this.theReceiptUri; //'/tmp/receipt.jpg';
        var base64str = fs.readFileSync(filePath, 'base64');
        var jsonData = {
            //file_data: base64str,
            file_name: fileName,
            boost_mode: 1
        };

        var USER_NAME = 'kennnethcrystal';
        var API_KEY = 'c4c919165b22663ba28d945e39091b34';
        var CLIENT_ID = 'vrfwIHukZL0nUZb8UBLNuGaVLlNO5vZsPxXn9Kw';
        var ENVIRONMENT_URL =  'https://api.veryfi.com'; //'https://api.veryfi.com/';

        var options = {
            method: "POST",
            uri: 'https://' + ENVIRONMENT_URL + '/api/v7/partner/documents/',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "CLIENT-ID": CLIENT_ID,
                "AUTHORIZATION": `apikey ${USER_NAME}:${API_KEY}`
            },
            json: jsonData
        };

        request(options, function(error, response, body) {
            console.log("here response", response)
            this.extractedData = body;
            console.log("here body", body);
        });

        return this.extractedData
    }
    


    createReceiptItemList(theData) {

        lineItems = theData.line_items;

        for (var i = 0; i < lineItems.length(); i++ ) {
            item = new receiptItem();
            desc = lineItems[i].description;
            quant = lineItems[i].quantity;
            units = lineItems[i].unit_of_measure ;
            if (desc != null) {
                item.setDescription(desc);
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
                item.setUnits(units);
            }
            else {
                item.setUnits("");
            }
            this.receiptItemList.push(item);
        }

        return this.receiptItemList
    }

}
module.exports = receiptDataExtractor;