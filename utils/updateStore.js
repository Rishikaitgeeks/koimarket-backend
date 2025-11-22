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
    const location_id = process.env.SHOPIFY_STORE_LOCATION_ID;
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

const deleteRetailShopifyProduct = async (product_id) => {
  try {
    if (!product_id) {
      throw new Error("Product ID is required");
    }
    const cleanedId = String(product_id).replace("gid://shopify/Product/", "");
    console.log("Deleting product from Shopify:", cleanedId);
    const result = await shopify.product.delete(cleanedId);
    console.log("Product deleted successfully:", cleanedId);
    return {
      success: true,
      message: "Product deleted from Shopify retail store",
      product_id: cleanedId,
      result,
    };
  } catch (error) {
    console.error("Error deleting Shopify product:", error);
    return {
      success: false,
      message: "Failed to delete product",
      error: error?.message,
    };
  }
};

module.exports = { setRetailShopifyInventory, shopify, deleteRetailShopifyProduct };

