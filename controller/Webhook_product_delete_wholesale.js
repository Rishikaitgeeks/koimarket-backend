const Order = require("../model/order.model");
const Wholesale = require("../model/wholesale.model");
const Retail = require("../model/retail.model");
const Sync = require("../model/sync.model");
const { deleteRetailShopifyProduct } = require("../utils/updateStore");

const Product_delete_wholesale = async (req, res) => {
  try {
    const order = req.body;
    const productId = `gid://shopify/Product/${order.id}`;
    const wholesaleDoc = await Wholesale.findOne({ product_id: productId }).lean();
    const sku = wholesaleDoc.sku;
    const retailDoc = await Retail.findOne({ sku }).lean();
    const retail_product_id = retailDoc.product_id;
   await deleteRetailShopifyProduct(retail_product_id);
   console.log("product delete in retail")
    return res
      .status(200)
      .json({ message: "Order sync complete and order deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
};

module.exports = { Product_delete_wholesale };
