const Order = require("../model/order.model");
const Wholesale = require("../model/wholesale.model");
const Retail = require("../model/retail.model");
const Sync = require("../model/sync.model");
const { setShopifyInventory } = require("../utils/update");

const Webhook2 = async (req, res) => {
  try {
    const order = req.body;
        console.log("object 2");

    const storeName = req.headers["x-shopify-shop-domain"] || null;
    const orderId = order.name;
console.log(order);

    const isRefund = order.refunds && order.refunds.length > 0;

    const items = isRefund
      ? order.refunds.flatMap((refund) =>
          refund.refund_line_items.map((refundItem) => ({
            sku: refundItem.line_item?.sku?.trim(),
            quantity: refundItem.quantity,
          }))
        )
      : order.line_items.map((item) => ({
          sku: item.sku?.trim(),
          quantity: item.quantity,
        }));
console.log("item",items)
    for (const { sku, quantity } of items) {
      if (!sku || !quantity) continue;
 console.log("foorloop", sku ,quantity )

      const wholesaleProduct = await Wholesale.findOne({ sku });
            console.log("wholesale pro" , wholesaleProduct);

      if (!wholesaleProduct) {
        continue;
      }
console.log("retail conditiojj pass");
      const inventoryId = wholesaleProduct.inventory_item_id;
      const currentQty = wholesaleProduct.quantity || 0;
console.log(inventoryId , currentQty);

      if (!inventoryId) {
        continue;
      }

      const newQty = isRefund ? currentQty + quantity : currentQty - quantity;
console.log(newQty , "newenewnew");
      await Retail.findOneAndUpdate(
        { sku },
        { $inc: { quantity: isRefund ? quantity : -quantity } }
      );

      await Wholesale.updateOne({ sku }, { quantity: newQty });
      await Sync.updateOne({ sku }, { quantity: newQty });
console.log("fun run");

      await setRetailShopifyInventory(inventoryId, newQty);
      console.log("fun end");

    }
     console.log("success true")

    await Order.deleteMany({ order_id: orderId, store_name: storeName });

    return res.status(200).json({
      message: `Inventory ${isRefund ? "restocked (refund)" : "synced (sale)"}`,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Webhook processing failed" });
  }
};

module.exports = { Webhook2 };
