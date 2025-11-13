require("dotenv").config();
const Shopify = require("shopify-api-node");

if (!process.env.SHOPIFY_STORE || !process.env.SHOPIFY_ACCESS_TOKEN || !process.env.SHOPIFY_LOCATION_ID) {
  throw new Error("Missing required Shopify environment variables");
}

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

const setShopifyInventory = async (inventory_item_id, quantity) => {
  try {
          console.log("in for SADDDDloop---------");

    const cleanedInventoryItemId = inventory_item_id.replace("gid://shopify/InventoryItem/", "");
    const location_id = process.env.SHOPIFY_LOCATION_ID;
        console.log("in forSADDDDDDDDDDDD loop---------");

    if (!cleanedInventoryItemId || !location_id) {
      return;
    }      console.log("in ASDDDDDDDDDDDDDDfor loop---------");


    await shopify.inventoryItem.update(cleanedInventoryItemId, {
      tracked: true,
    });
          console.log("in fASDDDDDDDDor loop---------");


  await shopify.inventoryLevel.set({
      location_id,
      inventory_item_id: cleanedInventoryItemId,
      available: quantity,
    });
      console.log("in forASDDDDDDDDDDDDDDDD loop---------");

  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = { setShopifyInventory, shopify };
