// This module handles all user interactions regarding receipts

class receipt {    
    verifyReceipt(data) {
        /*
            ask the user to verify receipt ingredients from OCR
            input will look like ["targe eggs", "safew milk"] 
            the user will see these ingredients on the screen
            - will be able to modify the ingredients
            - for example: change "targe eggs" to "eggs" or "target eggs"
            updated ingredients will be saved as a new list
            if data.length == 0:
            - InventoryManager recognized all of the items on the receipt
            - this is to avoid repeatedly asking for user modification for the same ingredients 
            - no user verification/modification needs to happen 
            else:
            - the list will contain unrecognized items
            - show list to user
            - user will make any modifications to ingredients or quantity
            call addToInventory() in inventory-manager component
            addToInventory() will call verifyReceipt() again if there are still unrecognized ingredients
            @param data: a list of user's receipt input with name/quantity/units
            @output correctData: an updated list of user verified ingredients
        */

        if (data.length != 0) {
            // show data to user
            // call addToInventory()
        }
    }
}