export default function getProductStockStatus(product) {
  const variants = product.product_variants || [];

  const allInventory = variants.flatMap((v) => v.inventory || []);

  // 🚨 NO INVENTORY = DISCONTINUED (your rule)
  if (allInventory.length === 0) {
    return {
      exists: false,
      inStock: false,
      discontinued: true,
    };
  }

  const discontinued = allInventory.some((i) => i.discontinued);

  const inStock = allInventory.some((i) => i.in_stock && i.quantity > 0);

  return {
    exists: true,
    inStock: inStock && !discontinued,
    discontinued,
  };
}
