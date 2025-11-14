require("dotenv").config();
const Shopify = require("shopify-api-node");

if (!process.env.SHOPIFY_STORES || !process.env.SHOPIFY_ACCESS_TOKEN_STORE || !process.env.SHOPIFY_STORE_LOCATION_ID) {
  throw new Error("Missing required Shopify environment variables");
}

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORES,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN_STORE,
});

const setRetailShopifyInventory = async (inventory_item_id, quantity) => {
  try {
    const cleanedInventoryItemId = inventory_item_id.replace("gid://shopify/InventoryItem/", "");
    const location_id = 72730837127;
    console.log("set",cleanedInventoryItemId,location_id)
    
    if (!cleanedInventoryItemId || !location_id) {
      return;
    }
 console.log("inventoryItem start",shopify.inventoryItem);
    await shopify.inventoryItem.update(cleanedInventoryItemId, {
      tracked: true,
    });
    console.log("inventory level start",shopify.inventoryLevel);

    await shopify.inventoryLevel.set({
      location_id,
      inventory_item_id: cleanedInventoryItemId,
      available: quantity,
    });
    console.log("function success")
  } catch (error) {
    throw error;
  }
};
module.exports = { setRetailShopifyInventory, shopify };
