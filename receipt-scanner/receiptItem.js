/*
<<<<<<< HEAD
This new class will act like a data container for processed receipt
data and will create items with properties:
Description, Quantity, and Units
=======
This new class will act like a data container for processed receipt item
and will create items with properties:
Description, Quantity, and Units 
>>>>>>> 12634d531be9bff32d74be7dabaaefaaedaf63c8
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
