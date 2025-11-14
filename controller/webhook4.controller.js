const { sendThresholdEmails } = require("./nodemailer");
const Order = require("../model/order.model");
const { updateBulkInventory } = require("./inventory.controller");


const Webhook4 = async (req, res) => {
  try {
    const order = req.body;
            console.log("object 4");

    console.log(order)
    const channel = order['source_name'];
    const orderId = order.id;
    const storeName = req.headers["x-shopify-shop-domain"] || null;
    console.log(channel);
    const lineItems = order.line_items || [];

    const inserted = [];

    for (const item of lineItems) {
      const sku = item.sku?.trim();
      const quantity = item.quantity;
      const variant_title = item.title;
      console.log("in for loop---------");

      if (!sku || !quantity || !variant_title || !orderId) continue;
      console.log("in for loop------ss---");

      // await updateBulkInventory(
      //   { body: [{ sku: sku, quantity: quantity }] },
      //   {}
      // );
      console.log("in ssssssssssfor loop---------");

      const newOrder = new Order({
        sku,
        quantity,
        variant_title,
        order_id: order.name,
        store_name: storeName,
        channel: channel
      });
      console.log("in ssssssssssssaaaaaaafor loop---------");


      const saved = await newOrder.save();
      console.log(saved);
      inserted.push(saved);
      console.log("insert")
    }
    console.log("in for loop----ASasASsS-----");

    // await sendThresholdEmails();

    return res.status(200).json({ message: "Order synced", inserted });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Failed to handle webhook" });
  }
};

module.exports = { Webhook4 };
