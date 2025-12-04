/**
 * @function selectRandomProduct
 * @description Select a random product from the list of product names
 * @param {string[]} productListNames - List of product names
 * @returns {string} Random product name
 */
export function selectRandomProduct(productListNames: string[]): string {
  const randomIndex = Math.floor(Math.random() * productListNames.length);
  return productListNames[randomIndex];
}


/**
 * @function cartAddRandomProduct
 * @description Select a random product from the list of product names
 * @param {string[]} productListNames - List of product names
 * @returns {string} Random product name
 */
export function cartAddRandomProduct(productListNames: string[]): string {
  const randomIndex = Math.floor(Math.random() * productListNames.length);
  return productListNames[randomIndex];
}