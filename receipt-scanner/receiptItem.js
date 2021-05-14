/*
This new class will act like a data container for processed receipt
data and will create items with properties:
Description, Quantity, and Units 
*/
class receiptItem {

  description;
  quantity;
  units;

  constructor() {
    this.description = ""
    this.quantity = ""
    this.units = ""
  }

  setDescription(desc) {
    this.description = desc;
  }


  setQuantity(quant) {
    this.quantity = quant;
  }

  setUnits(inputunits) {
    this.units = inputunits;
  }

  getItemDescription() {
    return this.description;
  }


  getItemQuantity() {
    return this.quantity;
  }

  getItemUnits() {
    return this.units;
  }

}

module.exports = receiptItem;