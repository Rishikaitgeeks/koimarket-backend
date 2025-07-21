const { graphqlRequest } = require("./retailShopify");
const fetchRetailVariants = async () => {
  const variants = [];
  let hasNextPage = true;
  let endCursor = null;

  try {
    while (hasNextPage) {
      const query = `
  {
    products(first: 100${endCursor ? `, after: "${endCursor}"` : ""}) {
      pageInfo { hasNextPage }
      edges {
        cursor
        node {
          id
          title
              images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                price
                inventoryQuantity
                inventoryItem {
                  id
                }
                image {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

      const result = await graphqlRequest({ query });
      if (!result?.data?.products?.edges) {
        break;
      }

      const productEdges = result.data.products.edges;

      for (const productEdge of productEdges) {
        const product = productEdge.node;
        for (const variantEdge of product.variants.edges) {
          const variant = variantEdge.node;

          const qty = variant.inventoryQuantity || 0;

          variants.push({
            sku: variant.sku,
            inventory_item_id: variant.inventoryItem?.id,
            quantity: qty,
            product_id: product.id,
            product_title: product.title,
            product_image: product.images?.edges?.[0]?.node?.url,
            variant_title: variant.title,
            variant_price: variant.price,
            variant_image: variant.image?.originalSrc,
          });
        }
      }

      hasNextPage = result.data.products.pageInfo.hasNextPage;
      endCursor =
        productEdges.length > 0
          ? productEdges[productEdges.length - 1].cursor
          : null;
    }
    return variants;
  } catch (err) {
    return [];
  }
};

module.exports = { fetchRetailVariants };