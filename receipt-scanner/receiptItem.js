/*
This new class will act like a data container for processed receipt
data and will create items with properties:
Description, Quantity, and Units 
*/
class receiptItem {

  constructor() {
    this.name = ""
    this.quantity = ""
    this.units = ""
  }

  setDescription(desc) {
    this.name = desc;
  }


  setQuantity(quant) {
    this.quantity = quant;
  }

  setUnits(inputunits) {
    this.units = inputunits;
  }

  getItemDescription() {
    return this.name;
  }


  getItemQuantity() {
    return this.quantity;
  }

  getItemUnits() {
    return this.units;
  }

}

module.exports = receiptItem;