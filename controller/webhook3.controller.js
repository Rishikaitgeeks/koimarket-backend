const Order = require("../model/order.model");
const { sendThresholdEmails } = require("./nodemailer");
const { updateBulkInventory } = require("./inventory.controller");

const Webhook3 = async (req, res) => {
  try {
    const order = req.body;
            console.log("object 3");

    const channel = order['source_name'];
    const orderId = order.name;
    const storeName = req.headers["x-shopify-shop-domain"] || null;
    console.log(orderId);

    const lineItems = order.line_items || [];

    const inserted = [];

    for (const item of lineItems) {
      const sku = item.sku?.trim();
      const quantity = item.quantity;
      const variant_title = item.title;

      console.log("in for loop---------");
      if (!sku || !quantity || !variant_title || !orderId) continue;
      console.log("in conditon----------");

      await updateBulkInventory(
        { body: [{ sku: sku, quantity: quantity }] },
        {}
      );
console.log("after query");
      const newOrder = new Order({
        sku,
        quantity,
        variant_title,
        order_id: order.name,
        store_name: storeName,
        channel: channel
      });
console.log("after new order");
      const saved = await newOrder.save();
      console.log(saved)
      inserted.push(saved);
      console.log(inserted.length);
    }
console.log("after save");
    // await sendThresholdEmails();

    return res.status(200).json({ message: "Order synced", inserted });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Failed to handle webhook" });
  }
};

module.exports = { Webhook3 };
