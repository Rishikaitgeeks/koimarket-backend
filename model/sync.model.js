const mongoose = require("mongoose");
const syncSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  product_title: { type: String, required: true},
   product_image:{ type: String, default: null},
   variant_title: { type: String, required: true},
   retail_price: {
  type: String,
  default: null
},
wholesale_price: {
  type: String,
  default: null
},
  variant_image:{type: String, default: null}
}, { timestamps: true });

module.exports = mongoose.model("Sync", syncSchema);
