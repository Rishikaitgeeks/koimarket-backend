const Order = require("../model/order.model");
const Wholesale = require("../model/wholesale.model");
const Retail = require("../model/retail.model");
const Sync = require("../model/sync.model");
const { deleteWholesaleShopifyProduct } = require("../utils/update");

const Product_update_wholesale = async (req, res) => {
  try {
    const order = req.body;
   console.log("wholesale",order);
    return res
      .status(200)
      .json({ message: "Order sync complete and order deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
};

module.exports = { Product_update_wholesale };
