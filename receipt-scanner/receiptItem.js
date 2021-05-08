/*
This new class will act like a data container for processed receipt
data and will create items with properties:
Description, Quantity, and Units 
*/
class thereceiptItem {

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

  getItemDescription()  {
  return description;
  }


  getItemQuantity() {
  return quantity;
  }

  getItemUnits() {
  return units;
  }

}

module.exports = thereceiptItem;